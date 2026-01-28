"use client"

import { Category } from "@/models/category";
import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { Delete, Edit, Info, LucideExternalLink, LucideX, Save } from "lucide-react";
import axios from "axios";
import { Config } from "@/models/config";
import Link from "next/link";
import { GridTable, GridTableColumn, GridTableFooterRow, GridTableHeaderRow, GridTableRow } from "@/components/ui/grid-table";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CategoryTableState {
    arrowDirection: "up" | "down";
    filterColumnIndex?: number;
    data: Category[];
    editColumnIds: number[];
}

export default function CategoriesTable({
    categories,
    config
}: {
    categories: Category[];
    config: Config
}) {
    const [state, setState] = useState<CategoryTableState>({
        arrowDirection: "up",
        data: categories,
        editColumnIds: [],
    });
    const handleFilterClick = (columnIndex: number) => {
        setState((old) => {
            let newArrowDirection = old.filterColumnIndex == undefined || old.filterColumnIndex != columnIndex || old.arrowDirection == "down"
                ? "up"
                : "down";
            return {
                editColumnIds: old.editColumnIds,
                arrowDirection: newArrowDirection,
                filterColumnIndex: columnIndex,
                data: categories.sort((a, b) => {
                    switch (columnIndex) {
                        case 0:
                            return newArrowDirection == "up" ? b.categoryId - a.categoryId : a.categoryId - b.categoryId;
                        case 1:
                            return newArrowDirection == "up" && b.name > a.name
                                ? 1
                                : newArrowDirection == "up" && b.name < a.name
                                    ? -1
                                    : newArrowDirection == "down" && b.name > a.name
                                        ? -1
                                        : 1;
                        case 2:
                            return newArrowDirection == "up" ? b.modelCount - a.modelCount : a.modelCount - b.modelCount;
                        case 3:
                            return newArrowDirection == "up" ? b.productCount - a.productCount : a.productCount - b.productCount;
                        case 4:
                            return newArrowDirection == "up" ? b.totalRawWeight - a.totalRawWeight : a.totalRawWeight - b.totalRawWeight;
                        case 5:
                            return newArrowDirection == "up" ? b.totalValueWeight - a.totalValueWeight : a.totalValueWeight - b.totalValueWeight;
                        case 6:
                            return newArrowDirection == "up" ? b.totalInventory - a.totalInventory : a.totalInventory - b.totalInventory;
                        case 7:
                            return newArrowDirection == "up" ? b.totalSells - a.totalSells : a.totalSells - b.totalSells;
                        default:
                            return 1;
                    }
                })
            } as CategoryTableState;
        });
    };
    const setEditState = (id: number, isEditing: boolean) => {
        if (isEditing)
            setState((old) => ({
                arrowDirection: old.arrowDirection,
                data: old.data,
                editColumnIds: [...old.editColumnIds, id],
                filterColumnIndex: old.filterColumnIndex
            }));
        else
            setState((old) => ({
                arrowDirection: old.arrowDirection,
                data: old.data,
                editColumnIds: [...old.editColumnIds.filter(i => i != id)],
                filterColumnIndex: old.filterColumnIndex
            }));
    };
    return (
        <GridTable className="w-full min-w-2xl **:grid-cols-12" columnCount={12}>
            <GridTableHeaderRow>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 0 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(0)}>Id</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 1 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(1)} colSpan={4} className="col-span-4">Name</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 2 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(2)}>Models</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 3 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(3)}>Products</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 4 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(4)}>Total Weight (g)</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 5 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(5)}>Total Value (g)</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 6 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(6)}>Total Inventory (KT)</GridTableColumn>
                <GridTableColumn allowFilter arrowDirection={state.filterColumnIndex == 7 ? state.arrowDirection : "both"}
                    onClick={() => handleFilterClick(7)}>Total Sells</GridTableColumn>
                <GridTableColumn>Actions</GridTableColumn>
            </GridTableHeaderRow>
            {state.data.map((cat, index) => {
                const save = () => {
                    const newCat: Category = {
                        categoryId: cat.categoryId,
                        modelCount: cat.modelCount,
                        name: (document.getElementById(`category-new-name-${cat.categoryId}`) as HTMLInputElement)?.value,
                        productCount: cat.productCount,
                        totalInventory: cat.totalInventory,
                        totalRawWeight: cat.totalRawWeight,
                        totalSells: cat.totalSells,
                        totalValueWeight: cat.totalValueWeight
                    }
                    axios.put(`${config.backHost}/categories/${cat.categoryId}`, newCat)
                        .then(r => r.status == 200)
                        .then(b => {
                            if (b)
                                setState((old) => {
                                    const newData = [...old.data];
                                    newData.splice(index, 1, newCat);
                                    return {
                                        arrowDirection: old.arrowDirection,
                                        editColumnIds: old.editColumnIds,
                                        filterColumnIndex: old.filterColumnIndex,
                                        data: newData
                                    };
                                })
                        })
                        .finally(() => setEditState(cat.categoryId, false));
                }
                const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
                    if (e.key == "Escape") {
                        setEditState(cat.categoryId, false);
                    } else if (e.key == "Enter") {
                        save();
                    }
                };
                const handleEditClick: MouseEventHandler<HTMLButtonElement> = () => {
                    setEditState(cat.categoryId, true);
                };
                const handleSaveClick: MouseEventHandler<HTMLButtonElement> = () => {
                    save();
                };
                const handleCancelClick: MouseEventHandler<HTMLButtonElement> = () => {
                    setEditState(cat.categoryId, false);
                };
                const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = () => {
                    axios.delete(`${config.backHost}/categories/${cat.categoryId}`)
                        .then(r => r.status == 204)
                        .then(b => {
                            if (b)
                                setState((old) => {
                                    const newData = [...old.data];
                                    newData.splice(index, 1);
                                    return {
                                        arrowDirection: old.arrowDirection,
                                        editColumnIds: old.editColumnIds,
                                        filterColumnIndex: old.filterColumnIndex,
                                        data: newData
                                    };
                                })
                        })
                };
                return (
                    <GridTableRow key={cat.categoryId} onDoubleClick={() => setEditState(cat.categoryId, true)}>
                        <GridTableColumn>{cat.categoryId.toLocaleString()}</GridTableColumn>
                        {state.editColumnIds.find(id => id == cat.categoryId) ? (
                            <GridTableColumn colSpan={4} className="col-span-4">
                                <InputGroup>
                                    <InputGroupInput defaultValue={cat.name} id={`category-new-name-${cat.categoryId}`} required onKeyDown={handleKeyDown} />
                                    <InputGroupAddon align={"inline-end"}>
                                        <Tooltip>
                                            <TooltipTrigger type="button">
                                                <Info className="scale-75" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Press "Enter" to save changes or "Escape" to undo them
                                            </TooltipContent>
                                        </Tooltip>
                                    </InputGroupAddon>
                                </InputGroup>
                            </GridTableColumn>
                        ) : (
                            <GridTableColumn colSpan={4} className="col-span-4">{cat.name}</GridTableColumn>
                        )}
                        <GridTableColumn className="flex flex-row justify-between">
                            {cat.modelCount.toLocaleString()}
                            <Link href={`/models/${cat.name}`}>
                                <LucideExternalLink className="scale-75" />
                            </Link>
                        </GridTableColumn>
                        <GridTableColumn>{cat.productCount.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{cat.totalRawWeight.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{cat.totalValueWeight.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{cat.totalInventory.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{cat.totalSells.toLocaleString()}</GridTableColumn>
                        <GridTableColumn className="flex flex-row justify-between">
                            <Tooltip>
                                <TooltipTrigger type="button" className="cursor-pointer"
                                    onClick={state.editColumnIds.find(id => id == cat.categoryId) ? handleSaveClick : handleEditClick}>
                                    {state.editColumnIds.find(id => id == cat.categoryId) ? (
                                        <Save />
                                    ) : (
                                        <Edit />
                                    )}
                                </TooltipTrigger>
                                <TooltipContent>
                                    {state.editColumnIds.find(id => id == cat.categoryId) ? (
                                        "Save"
                                    ) : (
                                        "Edit"
                                    )}
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger type="button" className="cursor-pointer"
                                    onClick={state.editColumnIds.find(id => id == cat.categoryId) ? handleCancelClick : handleDeleteClick}>
                                    {state.editColumnIds.find(id => id == cat.categoryId) ? (
                                        <LucideX />
                                    ) : (
                                        <Delete className="text-destructive" />
                                    )}

                                </TooltipTrigger>
                                <TooltipContent>
                                    {state.editColumnIds.find(id => id == cat.categoryId) ? (
                                        "Cancel"
                                    ) : (
                                        "Delete"
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        </GridTableColumn>
                    </GridTableRow>
                );
            })}

            <GridTableFooterRow>
                <GridTableColumn ># {state.data.length}</GridTableColumn>
                <GridTableColumn colSpan={4} className="col-span-4">Sum:</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.modelCount, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.productCount, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.totalRawWeight, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.totalValueWeight, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.totalInventory, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>{state.data.reduce((current, next) => current + next.totalSells, 0).toLocaleString()}</GridTableColumn>
                <GridTableColumn>-</GridTableColumn>
            </GridTableFooterRow>
        </GridTable>);
}