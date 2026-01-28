"use client"

import { GridTable, GridTableColumn, GridTableFooterRow, GridTableHeaderRow, GridTableRow } from "@/components/ui/grid-table";
import { useState } from "react";
import { Spool } from "@/models/spool";

interface CategoryTableState {
    arrowDirection: "up" | "down";
    filterColumnIndex?: number;
    data: Spool[];
}

export default function SpoolsTable({
    spools,
}: {
    spools: Spool[];
}) {
    const [state, setState] = useState<CategoryTableState>({
        arrowDirection: "up",
        data: spools,
    });
    const handleFilterClick = (columnIndex: number) => {
        setState((old) => {
            let newArrowDirection = old.filterColumnIndex == undefined || old.filterColumnIndex != columnIndex || old.arrowDirection == "down"
                ? "up"
                : "down";
            return {
                arrowDirection: newArrowDirection,
                filterColumnIndex: columnIndex,
                data: spools.sort((a, b) => {
                    switch (columnIndex) {
                        case 0:
                            return newArrowDirection == "up" ? b.spoolId - a.spoolId : a.spoolId - b.spoolId;
                        case 1:
                            return newArrowDirection == "up" && (b.colorHex ?? b.multiColorHexes ?? "") > (a.colorHex ?? a.multiColorHexes ?? "")
                                ? 1
                                : newArrowDirection == "up" && (b.colorHex ?? b.multiColorHexes ?? "") < (a.colorHex ?? a.multiColorHexes ?? "")
                                    ? -1
                                    : newArrowDirection == "down" && (b.colorHex ?? b.multiColorHexes ?? "") > (a.colorHex ?? a.multiColorHexes ?? "")
                                        ? -1
                                        : 1;
                        case 2:
                            return newArrowDirection == "up" && b.filamentName > a.filamentName
                                ? 1
                                : newArrowDirection == "up" && b.filamentName < a.filamentName
                                    ? -1
                                    : newArrowDirection == "down" && b.filamentName > a.filamentName
                                        ? -1
                                        : 1;
                        case 3:
                            return newArrowDirection == "up" && b.vendorName > a.vendorName
                                ? 1
                                : newArrowDirection == "up" && b.vendorName < a.vendorName
                                    ? -1
                                    : newArrowDirection == "down" && b.vendorName > a.vendorName
                                        ? -1
                                        : 1;
                        case 4:
                            return newArrowDirection == "up" && b.material > a.material
                                ? 1
                                : newArrowDirection == "up" && b.material < a.material
                                    ? -1
                                    : newArrowDirection == "down" && b.material > a.material
                                        ? -1
                                        : 1;
                        case 5:
                            return newArrowDirection == "up" ? b.remainingWeight - a.remainingWeight : a.remainingWeight - b.remainingWeight;
                        case 6:
                            return newArrowDirection == "up" ? b.price - a.price : a.price - b.price;
                        case 7:
                            return newArrowDirection == "up" ? b.remainingValue - a.remainingValue : a.remainingValue - b.remainingValue;
                        default:
                            return 1;
                    }
                })
            } as CategoryTableState;
        });
    };
    return (
        <GridTable className="w-full min-w-2xl **:grid-cols-12" columnCount={12}>
            <GridTableHeaderRow>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 0 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(0)}>Id</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 1 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(1)}>Color</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 2 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(2)} colSpan={5} className="col-span-5">Name</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 3 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(3)}>Vendor</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 4 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(4)}>Material</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 5 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(5)}>Remaining Weight (g)</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 6 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(6)}>Price (KT)</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 7 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(7)}>Remaining Value (KT)</GridTableColumn>
            </GridTableHeaderRow>
            {state.data.map((spool) => {
                const singleColorStyle = {
                    backgroundColor: `#${spool.colorHex}`
                };
                const multyColorStyle = [{
                    backgroundColor: `#${spool.multiColorHexes?.split(',')[0]}`
                }, {
                    backgroundColor: `#${spool.multiColorHexes?.split(',')[1]}`
                }];
                return (
                    <GridTableRow key={spool.spoolId}>
                        <GridTableColumn>{spool.spoolId.toLocaleString()}</GridTableColumn>
                        <GridTableColumn className="flex flex-row justify-center gap-1 *:border-2">
                            {(spool.colorHex?.length ?? 0) > 0
                                ? (<span className="w-full h-6 rounded-2xl" style={singleColorStyle} />)
                                : (<>
                                    <span className="w-1/2 h-6 rounded-s-2xl" style={multyColorStyle[0]} />
                                    <span className="w-1/2 h-6 rounded-e-2xl" style={multyColorStyle[1]} />
                                </>)}
                        </GridTableColumn>
                        <GridTableColumn colSpan={5} className="col-span-5">{spool.filamentName}</GridTableColumn>
                        <GridTableColumn>{spool.vendorName}</GridTableColumn>
                        <GridTableColumn>{spool.material}</GridTableColumn>
                        <GridTableColumn>{spool.remainingWeight.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{spool.price.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{spool.remainingValue.toLocaleString()}</GridTableColumn>
                    </GridTableRow>
                );
            })}

            <GridTableFooterRow>
                <GridTableColumn ># {state.data.length}</GridTableColumn>
                <GridTableColumn colSpan={8} className="col-span-8" >Sum:</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.remainingWeight, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.price, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.remainingValue, 0).toLocaleString()}</GridTableColumn>
            </GridTableFooterRow>
        </GridTable>);
}