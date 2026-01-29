"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Category } from "@/models/category"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

export const categoryColumns: ColumnDef<Category>[] = [
    {
        accessorKey: "categoryId",
        header: "Id",
        footer: ({ table }) => `# ${table.getRowCount()}`,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "modelCount",
        header: "Models",
        cell: ({ row }) => row.original.modelCount.toLocaleString(),
    },
    {
        accessorKey: "productCount",
        header: "Products",
        cell: ({ row }) => row.original.productCount.toLocaleString(),
    },
    {
        accessorKey: "totalRawWeight",
        header: "Raw weight",
        cell: ({ row }) => row.original.totalRawWeight.toLocaleString() + 'g',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.totalRawWeight + current, 0).toLocaleString() + 'g'
    },
    {
        accessorKey: "totalValueWeight",
        header: "Value weight",
        cell: ({ row }) => row.original.totalValueWeight.toLocaleString() + 'g',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.totalValueWeight + current, 0).toLocaleString() + 'g'
    },
    {
        accessorKey: "totalInventory",
        header: "Raw inventory",
        cell: ({ row }) => row.original.totalInventory.toLocaleString() + 'KT',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.totalInventory + current, 0).toLocaleString() + 'KT'
    },
    {
        accessorKey: "totalSells",
        header: "Sells",
        cell: ({ row }) => row.original.totalSells.toLocaleString() + 'KT',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.totalSells + current, 0).toLocaleString() + 'KT'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];