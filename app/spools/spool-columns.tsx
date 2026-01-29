"use client"
import { Spool } from "@/models/spool";
import { ColumnDef } from "@tanstack/react-table";

export const spoolColumns: ColumnDef<Spool>[] = [
    {
        accessorKey: "spoolId",
        header: "Id",
        footer: ({ table }) => `# ${table.getCenterRows().length}`,
    },
    {
        header: "Color",
        accessorFn: (spool) => spool.colorHex ?? spool.multiColorHexes,
        cell: ({ row }) => {
            const singleColorStyle = {
                backgroundColor: `#${row.original.colorHex}`
            };
            const multyColorStyle = [{
                backgroundColor: `#${row.original.multiColorHexes?.split(',')[0]}`
            }, {
                backgroundColor: `#${row.original.multiColorHexes?.split(',')[1]}`
            }];
            return (row.original.colorHex?.length ?? 0) > 0
                ? (<div className="w-10 h-5 rounded-2xl border-2" style={singleColorStyle} />)
                : (<div className="flex">
                    <div className="w-5 h-5 rounded-s-2xl border-2" style={multyColorStyle[0]} />
                    <div className="w-5 h-5 rounded-e-2xl border-e-2 border-t-2 border-b-2" style={multyColorStyle[1]} />
                </div>)
        }
    },
    {
        accessorKey: "filamentName",
        header: "Name",
    },
    {
        accessorKey: "vendorName",
        header: "Vendor",
    },
    {
        accessorKey: "material",
        header: "Material",
    },
    {
        accessorKey: "remainingWeight",
        header: "Remaining weight",
        cell: ({ row }) => row.original.remainingWeight.toLocaleString() + 'g',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.remainingWeight + current, 0).toLocaleString() + 'g'
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => row.original.price.toLocaleString() + 'KT',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.price + current, 0).toLocaleString() + 'KT'
    },
    {
        accessorKey: "remainingValue",
        header: "Remaining value",
        cell: ({ row }) => row.original.remainingValue.toLocaleString() + 'KT',
        footer: ({ table }) => table.getCenterRows()
            .reduce((current, next) => next.original.remainingValue + current, 0).toLocaleString() + 'KT'
    },
];