"use client"

import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export default function ComboBox(
    {
        list,
        defaultValue,
        placeholder,
        id,
        name,
        innerClassname,
        disableNew
    }: {
        list: {
            id: number
            name: string
        }[],
        defaultValue?: {
            id: number,
            name: string
        },
        placeholder?: string
        id?: string
        name?: string
        innerClassname?: string;
        disableNew?: boolean
    }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setValue] = useState(defaultValue);
    const [currentList, setList] = useState(list);
    const searchRef = useRef<HTMLInputElement>(null!);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    id={id}
                >
                    <label className={cn(selectedValue ? "opacity-100" : "opacity-55")}>
                        {selectedValue
                            ? selectedValue.name
                            : placeholder}
                    </label>
                    <ChevronsUpDown className="opacity-50" />
                    <Input type="hidden" name={`${name}-id`} value={selectedValue?.id ?? ""} />
                    <Input type="hidden" name={`${name}-name`} value={selectedValue?.name ?? ""} />


                </Button>
            </PopoverTrigger>
            <PopoverContent className={innerClassname}>
                <Command>
                    <CommandInput ref={searchRef} onKeyDown={(e) => {
                        if (e.key == "Enter" && searchRef.current.value.trim() != "") {
                            var possibleValue = currentList.find(l => l.name == searchRef.current.value);
                            if (possibleValue) {
                                setValue(possibleValue);
                            }
                            else if (!disableNew) {
                                var newList = currentList.slice();
                                var newValue = {
                                    id: 0,
                                    name: searchRef.current.value
                                };
                                newList.push(newValue);
                                setList(newList);
                                setValue(newValue);
                            }
                            setOpen(false);
                        }
                    }} placeholder={`Search ${disableNew ? "..." : "or add"}`} className="h-9" />
                    <CommandList>
                        <CommandEmpty> {disableNew ? "Not found" : "Press Enter to add"}</CommandEmpty>
                        <CommandGroup>
                            {currentList.map((l) => (
                                <CommandItem
                                    key={l.name}
                                    value={l.name}
                                    onSelect={(currentValueName) => {
                                        const currentValueId = currentList.find((l) => l.name == currentValueName)?.id ?? 0;
                                        setValue(selectedValue?.name === currentValueName ? undefined : { id: currentValueId, name: currentValueName });
                                        setOpen(false)
                                    }}
                                    className="justify-between"
                                >
                                    <span className="grow">
                                        {l.name}
                                    </span>
                                    <Check
                                        className={cn(
                                            selectedValue?.name === l.name ? "opacity-100" : "opacity-0"
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