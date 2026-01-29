import { getSpools } from "@/lib/api/spools";
import { Suspense } from "react";
import DataTable from "@/components/ui/data-table";
import { spoolColumns } from "./spool-columns";

export default async function SpoolsPage() {
    const spools = await getSpools();
    return <div className="p-4">
        <Suspense>
            <DataTable columns={spoolColumns} data={spools} />
        </Suspense>
    </div>;
}