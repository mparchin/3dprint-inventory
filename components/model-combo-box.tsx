"use client"
import { Check, ChevronRight, ChevronsUpDown, LucideArrowBigDown, LucideArrowBigRight } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useEffect, useRef, useState } from "react";
import { Model } from "@/models/model";
import { cn } from "@/lib/utils";
import { Category } from "@/models/category";

export default function ModelComboBox({
    id,
    name,
    innerClassname,
    models,
    defaultModel,
    children,
    ...props
}: {

    innerClassname?: string
    models: Model[];
    defaultModel?: Model;
} & React.ComponentProps<"button">) {
    const getCategories = () => models
        .map(m => m.category)
        .reduce((current, next) => current.every(c => c.categoryId != next.categoryId)
            ? [...current, next] : current, [] as Category[]).map(c => ({
                id: c.categoryId,
                name: c.name
            }));
    const getModelsInCategory = (catId: number) => models
        .filter(m => m.category.categoryId == catId)
        .map(m => ({
            id: m.modelId,
            name: m.name
        }));
    const handleSetValue = (old: Model | undefined, newValueId: number, newValueName: string) => old?.modelId == 0
        ? models.find(m => m.modelId == newValueId)
        : ({
            category: {
                categoryId: newValueId,
                name: newValueName,
                modelCount: 0,
                productCount: 0,
                totalInventory: 0,
                totalRawWeight: 0,
                totalSells: 0,
                totalValueWeight: 0
            },
            description: "",
            files: [],
            modelId: 0,
            modelTags: [],
            name: "",
            printSpecifications: "",
            shortDescription: "",
            valueToCostRatio: 0,
        });
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultModel);
    const [list, setList] = useState(getCategories());
    useEffect(() => {
        if (value && value.modelId == 0 && value.category.categoryId != 0)
            setList((old) => getModelsInCategory(value.category.categoryId));
        else
            setList((old) => getCategories());
    }, [value]);
    const searchRef = useRef<HTMLInputElement>(null!);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between p-0 pe-3"
                    id={id}
                    {...props}
                >
                    <label className={cn("flex", value ? "opacity-100" : "opacity-55")}>
                        <div className="border p-2 ps-4 rounded-2xl flex text-primary">
                            {value?.category.name ?? "Dice holders"}
                            <ChevronRight className="mt-0.5 ms-2 me-1" />
                        </div>
                        <div className="mt-2 ms-4">
                            {value?.name ?? "Pisa tower"}
                        </div>
                        {children}
                    </label>
                    <ChevronsUpDown className="opacity-50" />
                    <Input type="hidden" name={`${name}-modelId`} value={value?.modelId ?? ""} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={innerClassname}>
                <Command>
                    <CommandInput ref={searchRef} onKeyDown={(e) => {
                        if (e.key == "Enter" && searchRef.current.value.trim() != "") {
                            var newValue = list.find(l => l.name == searchRef.current.value);
                            if (newValue) {
                                setValue((old) => handleSetValue(old, newValue!.id, newValue!.name));
                            }
                            if (value?.modelId == 0)
                                setOpen(false)
                            searchRef.current.value = "";
                        }
                    }} placeholder="Search ..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Not found</CommandEmpty>
                        <CommandGroup>
                            {list.map((l) => (
                                <CommandItem
                                    key={l.name}
                                    value={l.name}
                                    onSelect={(newValueName) => {
                                        const newValueId = list.find((l) => l.name == newValueName)?.id ?? 0;
                                        setValue((old) => handleSetValue(old, newValueId, newValueName));
                                        if (value?.modelId == 0)
                                            setOpen(false)

                                        searchRef.current.value = " ";
                                    }}
                                    className="justify-between"
                                >
                                    <span className="grow">
                                        {l.name}
                                    </span>
                                    <Check
                                        className={cn(
                                            value?.name === l.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
