import { FilterX } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Tag } from "@/models/tag";
import { Filter } from "./filter";
import { Dispatch, SetStateAction } from "react";

export default function ModelFilter({
    tags,
    total,
    filter,
    setFilter
}: {
    tags: Tag[];
    total: number;
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
}) {
    return (
        <div className="w-2xs m-auto md:mt-0 md:order-2 bg-sidebar rounded-xl flex flex-col">
            <div className="flex flex-row justify-between p-1 border-b-2">
                <span className="ms-3 mt-2">Total:</span>
                <span className="ms-11 mt-2">({total})</span>
                <Button size={"icon"} type="button" className="cursor-pointer" variant={"ghost"} onClick={() => setFilter(() => ({ selectedTagIds: [] }))}>
                    <FilterX className="text-destructive" />
                </Button>
            </div>
            {/* TODO Style checkbox */}
            <div className="p-4">
                {tags.map(t => (
                    <Field key={t.tagId} orientation={"horizontal"} className="w-full gap-0 border-b p-2 last:border-0">
                        <FieldLabel className="w-full" htmlFor={`tagId-${t.tagId}`}>{t.name}</FieldLabel>
                        <Input id={`tagId-${t.tagId}`} type="checkbox" className="scale-50"
                            checked={filter.selectedTagIds.find(st => st == t.tagId) != undefined}
                            onChange={() => setFilter((current) => {
                                if (current.selectedTagIds.find(st => st == t.tagId))
                                    return { selectedTagIds: current.selectedTagIds.filter(id => id != t.tagId) };
                                return { selectedTagIds: [...current.selectedTagIds, t.tagId] };
                            })} />
                        <label className="ms-auto" htmlFor={`tagId-${t.tagId}`}>({t.modelCount})</label>
                    </Field>
                ))}
            </div>
        </div>
    );
}