import getConfig from "@/lib/getConfig";
import { Model } from "@/models/model";
import { File } from "@/models/file";
import ModelForm from "./model-form";
import { getModel, getModels, postModel, putModel } from "@/lib/api/models";
import { getLowestPricePerG } from "@/lib/api/spools";
import { getCategories } from "@/lib/api/categories";
import { getTags } from "@/lib/api/tags";
import { redirect, RedirectType } from "next/navigation";

export async function generateStaticParams() {
    return await getModels()
        .then(ms => [...ms.map(m => ({
            cat: m.category.name,
            id: m.modelId.toString()
        })), {
            cat: "-",
            id: "new"
        }]);
}

async function onSubmit(formData: FormData) {
    "use server"
    let model = {
        modelId: Number(formData.get("id") ?? 0),
        name: formData.get("name")?.toString(),
        description: formData.get("description")?.toString(),
        shortDescription: formData.get('shortDescription')?.toString(),
        category: {
            categoryId: Number(formData.get('category-id') ?? 0),
            name: formData.get('category-name')?.toString()
        },
        modelTags: formData.get('tags-ids')?.toString().split(',').map((id, index) => ({
            tag: {
                tagId: Number(id),
                name: formData.get('tags-names')?.toString().split(',')[index]
            }
        })),
        printSpecifications: formData.get('specifications')?.toString(),
        additionalCostsg: Number(formData.get("adcost") ?? 0),
        valueToCostRatio: Number(formData.get("ValueDividedByCost") ?? 0)

    } as Model;

    let files: File[] = [];
    for (let i = 0; i < Number(formData.get('files-count') ?? 0); i++) {
        if (Number(formData.get(`files-${i}-valid`) ?? 0) == 0)
            continue;
        files = [...files, {
            fileId: Number(formData.get(`files-${i}-id`) ?? 0),
            fileType: {
                fileTypeId: Number(formData.get(`files-${i}-type-id`) ?? 0),
                name: formData.get(`files-${i}-type-name`)?.toString() ?? "",
            },
            path: formData.get(`files-${i}`)?.toString() ?? "",
            size: Number(formData.get(`files-${i}-size`) ?? 0),
            electricityCostg: Number(formData.get(`files-${i}-elec`) ?? 0),
            repeatations: Number(formData.get(`files-${i}-repeats`) ?? 0),
            weight: Number(formData.get(`files-${i}-grams`) ?? 0),
            printTime: `${formData.get(`files-${i}-h`)?.toString() ?? "00"}:${formData.get(`files-${i}-m`)?.toString() ?? "00"}:00`
        }]
    }
    model.files = files;

    const newModel = await (model.modelId == 0
        ? postModel(model)
        : putModel(model));

    return redirect(`/models/${newModel.category.name}/edit/${newModel.modelId}`, RedirectType.replace);
}

export default async function Page({
    params
}: {
    params: Promise<{
        cat: string;
        id: string;
    }>;
}) {
    const config = await getConfig();
    const modelId = (await params).id == "new" ? 0 : Number((await params).id);

    const lowestSpoolCostPerG = getLowestPricePerG();
    const cats = getCategories();
    const tags = getTags();
    const model = modelId == 0
        ? Promise.resolve<Model | undefined>(undefined)
        : getModel(modelId);
    await Promise.all([lowestSpoolCostPerG, cats, tags, model]);
    return (
        <div className="w-full p-8">
            <form action={onSubmit}>
                <ModelForm cats={await cats} tags={await tags} config={config}
                    lowestSpoolCostPerG={await lowestSpoolCostPerG} defaultModel={await model} />
            </form>
        </div>
    );
}