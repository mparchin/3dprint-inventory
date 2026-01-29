
import getConfig from "@/lib/getConfig";
import { getCategoryReport } from "@/lib/api/categories";
import DataTable from "@/components/ui/data-table";
import { categoryColumns } from "./category-columns";
import { Suspense } from "react";

export default async function CategoriesPage() {
    const config = await getConfig();
    const cats = await getCategoryReport();
    return <div className="p-4">
        {/* <CategoriesTable categories={cats} config={config} /> */}
        <Suspense>
            <DataTable columns={categoryColumns} data={cats} />
        </Suspense>
    </div>;
}