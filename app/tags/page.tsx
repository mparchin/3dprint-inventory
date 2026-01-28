import { getTagReport } from "@/lib/api/tags";
import TagsTable from "./tags-table";
import getConfig from "@/lib/getConfig";

export default async function CategoriesPage() {
    const config = await getConfig();
    const tags = await getTagReport();
    return <div className="p-4">
        <TagsTable tags={tags} config={config} />
    </div>;
}