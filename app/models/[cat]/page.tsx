import ModelContainer from "@/components/models/model-containter";
import { getCategories } from "@/lib/api/categories";
import { getModels } from "@/lib/api/models";

export async function generateStaticParams() {
    return await getCategories()
        .then(cs => cs.map(c => ({
            cat: c.name
        })));
}

export default async function Page({
    params
}: {
    params: Promise<{ cat: string }>;
}) {
    const catName = decodeURI((await params).cat);
    const catId = await getCategories()
        .then(cs => cs.find(c => c.name == catName)?.categoryId);
    const models = await getModels()
        .then(ms => ms.filter(m => m.category.categoryId == catId));
    return <ModelContainer models={models} />;
}