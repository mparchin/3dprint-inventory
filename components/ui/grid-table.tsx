import { cn } from "@/lib/utils";
import { LucideArrowDownNarrowWide, LucideArrowUpDown, LucideArrowUpWideNarrow } from "lucide-react";
import { MouseEventHandler } from "react";

export function GridTableColumn({
    colSpan,
    allowFilter,
    arrowDirection = "both",
    children,
    className,
    onClick,
    ...props
}: React.ComponentProps<"div"> & {
    colSpan?: number;
    allowFilter?: boolean;
    arrowDirection?: "both" | "up" | "down";
    onClick?: MouseEventHandler<HTMLDivElement>
}) {
    return <div className={cn("not-last:border-e-2 flex flex-col justify-around",
        colSpan ? `col-span-${colSpan}` : "")}>
        <div {...props} onClick={onClick} className={cn(allowFilter ? "cursor-pointer flex flex-row justify-between flex-wrap" : "ps-2", className)} >
            {children}
            {allowFilter == undefined || !allowFilter ? (<></>) : (
                <span className="scale-75">
                    {arrowDirection == "up"
                        ? <LucideArrowUpWideNarrow />
                        : arrowDirection == "down" ? <LucideArrowDownNarrowWide />
                            : <LucideArrowUpDown />}
                </span>
            )}
        </div>
    </div>
}

export function GridTableRow({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return <div className={cn("not-first:border-t-2",
        "grid",
        "not-data-[type=footer]:not-data-[type=header]:*:p-2",
        "even:bg-sidebar-accent",
        "odd:bg-sidebar",
        "data-[type=footer]:bg-primary-foreground",
        "first:rounded-t-2xl",
        "last:rounded-b-2xl", className)} {...props} />
}

export function GridTable({
    className,
    columnCount,
    ...props
}: React.ComponentProps<"div"> & {
    columnCount: number
}) {
    return <div className={cn(`**:grid-cols-${columnCount}`, className)} {...props} />
}

export function GridTableHeaderRow({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return <GridTableRow data-type="header" className={cn("*:p-2 *:text-shadow-lg mb-2", className)} {...props} />
}

export function GridTableFooterRow({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return <GridTableRow data-type="footer" className={cn("*:p-2 mt-2", className)} {...props} />
}

