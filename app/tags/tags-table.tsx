"use client"

import { GridTable, GridTableColumn, GridTableFooterRow, GridTableHeaderRow, GridTableRow } from "@/components/ui/grid-table";
import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Delete, Edit, Info, LucideExternalLink, LucideX, Save } from "lucide-react";
import axios from "axios";
import { Config } from "@/models/config";
import Link from "next/link";
import { Tag } from "@/models/tag";

interface CategoryTableState {
    arrowDirection: "up" | "down";
    filterColumnIndex?: number;
    data: Tag[];
    editColumnIds: number[];
}

export default function TagsTable({
    tags,
    config
}: {
    tags: Tag[];
    config: Config
}) {
    const [state, setState] = useState<CategoryTableState>({
        arrowDirection: "up",
        data: tags,
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
                data: tags.sort((a, b) => {
                    switch (columnIndex) {
                        case 0:
                            return newArrowDirection == "up" ? b.tagId - a.tagId : a.tagId - b.tagId;
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
            {state.data.map((tag, index) => {
                const save = () => {
                    const newTag: Tag = {
                        tagId: tag.tagId,
                        modelCount: tag.modelCount,
                        name: (document.getElementById(`tag-new-name-${tag.tagId}`) as HTMLInputElement)?.value,
                        productCount: tag.productCount,
                        totalInventory: tag.totalInventory,
                        totalRawWeight: tag.totalRawWeight,
                        totalSells: tag.totalSells,
                        totalValueWeight: tag.totalValueWeight
                    }
                    axios.put(`${config.backHost}/tags/${tag.tagId}`, newTag)
                        .then(r => r.status == 200)
                        .then(b => {
                            if (b)
                                setState((old) => {
                                    const newData = [...old.data];
                                    newData.splice(index, 1, newTag);
                                    return {
                                        arrowDirection: old.arrowDirection,
                                        editColumnIds: old.editColumnIds,
                                        filterColumnIndex: old.filterColumnIndex,
                                        data: newData
                                    };
                                })
                        })
                        .finally(() => setEditState(tag.tagId, false));
                }
                const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
                    if (e.key == "Escape") {
                        setEditState(tag.tagId, false);
                    } else if (e.key == "Enter") {
                        save();
                    }
                };
                const handleEditClick: MouseEventHandler<HTMLButtonElement> = () => {
                    setEditState(tag.tagId, true);
                };
                const handleSaveClick: MouseEventHandler<HTMLButtonElement> = () => {
                    save();
                };
                const handleCancelClick: MouseEventHandler<HTMLButtonElement> = () => {
                    setEditState(tag.tagId, false);
                };
                const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = () => {
                    axios.delete(`${config.backHost}/tags/${tag.tagId}`)
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
                    <GridTableRow key={tag.tagId} onDoubleClick={() => setEditState(tag.tagId, true)}>
                        <GridTableColumn>{tag.tagId.toLocaleString()}</GridTableColumn>
                        {state.editColumnIds.find(id => id == tag.tagId) ? (
                            <GridTableColumn colSpan={4} className="col-span-4">
                                <InputGroup>
                                    <InputGroupInput defaultValue={tag.name} id={`tag-new-name-${tag.tagId}`} required onKeyDown={handleKeyDown} />
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
                            <GridTableColumn colSpan={4} className="col-span-4">{tag.name}</GridTableColumn>
                        )}
                        <GridTableColumn className="flex flex-row justify-between">
                            {tag.modelCount.toLocaleString()}
                            <Link href={`/`}>
                                <LucideExternalLink className="scale-75" />
                            </Link>
                        </GridTableColumn>
                        <GridTableColumn>{tag.productCount.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{tag.totalRawWeight.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{tag.totalValueWeight.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{tag.totalInventory.toLocaleString()}</GridTableColumn>
                        <GridTableColumn>{tag.totalSells.toLocaleString()}</GridTableColumn>
                        <GridTableColumn className="flex flex-row justify-between">
                            <Tooltip>
                                <TooltipTrigger type="button" className="cursor-pointer"
                                    onClick={state.editColumnIds.find(id => id == tag.tagId) ? handleSaveClick : handleEditClick}>
                                    {state.editColumnIds.find(id => id == tag.tagId) ? (
                                        <Save />
                                    ) : (
                                        <Edit />
                                    )}
                                </TooltipTrigger>
                                <TooltipContent>
                                    {state.editColumnIds.find(id => id == tag.tagId) ? (
                                        "Save"
                                    ) : (
                                        "Edit"
                                    )}
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger type="button" className="cursor-pointer"
                                    onClick={state.editColumnIds.find(id => id == tag.tagId) ? handleCancelClick : handleDeleteClick}>
                                    {state.editColumnIds.find(id => id == tag.tagId) ? (
                                        <LucideX />
                                    ) : (
                                        <Delete className="text-destructive" />
                                    )}

                                </TooltipTrigger>
                                <TooltipContent>
                                    {state.editColumnIds.find(id => id == tag.tagId) ? (
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