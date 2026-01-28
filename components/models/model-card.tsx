import { Model } from "@/models/model";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import StlViewer from "../stl-viewer";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { Filter } from "./filter";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";

export default function ModelCard({
    model,
    setFilter,
    filter,
}: {
    model: Model;
    setFilter: Dispatch<SetStateAction<Filter>>;
    filter: Filter;
}) {
    return (
        <Card className="w-3xs m-auto" key={model.name}>
            <StlViewer url={model.files.find(f => f.fileType.name == "STL")?.url ?? "/test.stl"} className="bg-card m-auto w-full aspect-square" />
            <CardHeader>
                <CardTitle>
                    <Link href={`/models/${model.category.name}/edit/${model.modelId}`}>
                        {model.name}
                    </Link>
                </CardTitle>
                <CardDescription className="flex justify-between col-span-2">
                    <span>
                        {model.shortDescription}
                    </span>
                    <span>
                        {model?.totalRawWeight}/{model?.totalValueWeight}
                    </span>
                </CardDescription>
                <CardAction>
                    <Link href={`/print/${model.category.name}/${model.name}/edit/new`}>
                        <Printer className="text-primary" />
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>{model.description}</CardContent>
            <CardFooter>
                <div className="flex gap-2 flex-wrap">
                    {model.modelTags.map(mt => <Button type="button" className="cursor-pointer"
                        variant={filter.selectedTagIds.find(id => mt.tag.tagId == id) ? "default" : "outline"} size={"xs"} key={mt.tag.name} onClick={() => setFilter((old) => {
                            if (old.selectedTagIds.find(id => id == mt.tag.tagId))
                                return { selectedTagIds: old.selectedTagIds.filter(id => id != mt.tag.tagId) };
                            return { selectedTagIds: [...old.selectedTagIds, mt.tag.tagId] };
                        })}>{mt.tag.name}</Button>)}
                </div>
            </CardFooter>
        </Card>
    );
}