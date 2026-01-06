"use client"

import { Check, ChevronsUpDown, Cross, Delete, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export default function ComboBoxTags(
    {
        list,
        values,
        placeholder,
        id,
        name,
        innerClassname,
    }: {
        list: {
            id: number
            name: string
        }[],
        values?: {
            id: number,
            name: string
        }[],
        placeholder?: string
        id?: string
        name?: string
        innerClassname?: string
    }) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setValue] = useState(values);
    const [currentList, setList] = useState(list);
    const searchRef = useRef<HTMLInputElement>(null!);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex h-fit pt-2 pb-2"
                    id={id}
                >
                    <div className="flex flex-wrap gap-1">
                        {selectedValues?.length ?? 0 > 0 ? selectedValues!.map(l => (
                            <Badge key={l.name} variant={"default"}>
                                {l.name}
                            </Badge>
                        )) : (
                            <label className="opacity-55">
                                {placeholder}
                            </label>
                        )}
                    </div>

                    <div className="grow"></div>
                    <ChevronsUpDown className="opacity-50" />
                    <Input type="hidden" name={`${name}-ids`} value={selectedValues?.map(v => v.id.toString()) ?? [""]} />
                    <Input type="hidden" name={`${name}-names`} value={selectedValues?.map(v => v.name) ?? [""]} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={innerClassname}>
                <Command>
                    <CommandInput ref={searchRef} onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            var possibleValue = currentList.find(l => l.name == searchRef.current.value);
                            if (possibleValue) {
                                if (selectedValues?.find(v => v.name === possibleValue?.name)) {

                                }
                                else {
                                    var newSelectedValues = selectedValues?.slice() ?? [];
                                    newSelectedValues.push(possibleValue);
                                    setValue(newSelectedValues);
                                }
                            }
                            else {
                                var newList = currentList.slice();
                                var newValue = {
                                    id: 0,
                                    name: searchRef.current.value
                                };
                                newList.push(newValue);
                                setList(newList);
                                var newSelectedValues = selectedValues?.slice() ?? [];
                                newSelectedValues.push(newValue);
                                setValue(newSelectedValues);
                            }
                            // setOpen(false);
                        }
                    }} placeholder="Search or add" className="h-9" />
                    <CommandList>
                        <CommandEmpty>Press Enter to add</CommandEmpty>
                        <CommandGroup>
                            {currentList.map((l) => (
                                <CommandItem
                                    key={l.name}
                                    value={l.name}
                                    onSelect={(currentValueName) => {
                                        const currentValue = currentList.find((l) => l.name == currentValueName);
                                        if (currentValue == undefined)
                                            return;
                                        const possibleSelected = selectedValues?.find(v => v.name === currentValueName);
                                        if (possibleSelected) {
                                            var newValues = (selectedValues?.slice() ?? []).filter(v => v.name != possibleSelected.name);
                                            setValue(newValues);
                                        }
                                        else {
                                            var newValues = selectedValues?.slice() ?? [];
                                            newValues.push(currentValue!);
                                            setValue(newValues)
                                        }
                                        // setOpen(false)
                                    }}
                                    className="justify-between"
                                >
                                    <span className="grow">
                                        {l.name}
                                    </span>
                                    <Check
                                        className={cn(
                                            selectedValues?.find(v => v.name === l.name) ? "opacity-100" : "opacity-0"
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