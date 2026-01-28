"use client"

import { Model } from "@/models/model";
import ModelCard from "./model-card";
import ModelFilter from "./model-filter";
import { Tag } from "@/models/tag";
import { useEffect, useState } from "react";
import { Filter } from "./filter";

export default function ModelContainer({
    models
}: {
    models: Model[]
}) {
    const [data, setData] = useState(models);
    const [filter, setFilter] = useState<Filter>({ selectedTagIds: [] });

    useEffect(() => {
        setData(() => filter.selectedTagIds.length == 0
            ? models
            : models.filter(m => filter.selectedTagIds.every(id => m.modelTags.find(mt => mt.tag.tagId == id))))
    }, [filter, filter.selectedTagIds, models]);

    const tags = data.flatMap(m => m.modelTags)
        .map(mt => mt.tag)
        .reduce((total, current) => {
            const currentTagInArray = total.find(t => t.tagId == current.tagId);
            if (currentTagInArray)
                currentTagInArray.modelCount++;
            else
                total.push({
                    tagId: current.tagId,
                    name: current.name,
                    modelCount: 1,
                    productCount: current.productCount,
                    totalInventory: current.totalInventory,
                    totalRawWeight: current.totalRawWeight,
                    totalSells: current.totalSells,
                    totalValueWeight: current.totalValueWeight
                });
            return total;
        }, [] as Tag[])

    return (
        <div className="w-full flex md:flex-row flex-col p-4 gap-4">
            <ModelFilter tags={tags} total={data.length} filter={filter} setFilter={setFilter} />
            <div className="w-full flex flex-row flex-wrap gap-4">
                {data.map(model => (
                    <ModelCard model={model} key={model.name} setFilter={setFilter} filter={filter} />
                ))}
            </div>
        </div>
    );
}