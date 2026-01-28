
import getConfig from "@/lib/getConfig";
import CategoriesTable from "./categories-table";
import { getCategoryReport } from "@/lib/api/categories";

export default async function CategoriesPage() {
    const config = await getConfig();
    const cats = await getCategoryReport();
    return <div className="p-4">
        <CategoriesTable categories={cats} config={config} />
    </div>;
}