"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { useState } from "react"
import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide, ChevronLeft, ChevronRight } from "lucide-react"


export default function DataTable<TData, TValue>({
    columns,
    data,
}: {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    return (
        <div>
            <div className="overflow-hidden rounded-2xl border">
                <Table className="table-auto">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : header.column.getCanFilter() ? (
                                                    <Button variant={"ghost"} className="cursor-pointer"
                                                        onClick={() => {
                                                            header.column.toggleSorting(header.column.getIsSorted() === "asc");
                                                        }}>
                                                        <div className="text-wrap wrap-normal">
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        </div>
                                                        {
                                                            header.column.getIsSorted() === false
                                                                ? <ArrowUpDown className="ml-2 h-4 w-4" />
                                                                : header.column.getIsSorted() === "asc"
                                                                    ? <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
                                                                    : <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
                                                        }
                                                    </Button>
                                                ) : (
                                                    <div className="text-wrap wrap-normal">
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </div>
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <div className="text-wrap wrap-normal">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {table.getFooterGroups().every(g => g.headers.every(f => f.column.columnDef.footer == undefined))
                        ? <></>
                        : (
                            <TableFooter>
                                {table.getFooterGroups().map(footerGroup => (
                                    <TableRow key={footerGroup.id}>
                                        {footerGroup.headers.map(footer => (
                                            <TableCell key={footer.id}>
                                                <div className="text-wrap wrap-normal">
                                                    {footer.isPlaceholder
                                                        ? null
                                                        : flexRender(footer.column.columnDef.footer,
                                                            footer.getContext())
                                                    }
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableFooter>
                        )}

                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="cursor-pointer"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="cursor-pointer"
                >
                    <span className="sr-only">Next</span>
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}