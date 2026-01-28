"use client"
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Spool } from "@/models/spool";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function SpoolComboBox({
    id,
    name,
    innerClassname,
    spools,
    defaultSpool,
    children,
    placeholder,
    className,
    ...props
}: {
    innerClassname?: string
    spools: Spool[];
    defaultSpool?: Spool;
    placeholder?: string;
} & React.ComponentProps<"button">) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultSpool);
    const searchRef = useRef<HTMLInputElement>(null!);
    const list = spools.map(s => ({
        spoolId: s.spoolId,
        filamentName: `${s.spoolId}-${s.filamentName}\t${s.remainingWeight}`,
        material: s.material,
        price: s.price,
        remainingValue: s.remainingValue,
        remainingWeight: s.remainingWeight,
        vendorName: s.vendorName,
        colorHex: s.colorHex,
        multiColorHexes: s.multiColorHexes
    } as Spool))
    const singleColorStyle = {
        backgroundColor: `#${value?.colorHex}`
    };
    const multyColorStyle = [{
        backgroundColor: `#${value?.multiColorHexes?.split(',')[0] ?? "000000"}`
    }, {
        backgroundColor: `#${value?.multiColorHexes?.split(',')[1] ?? "FFFFFF"}`
    }];
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("justify-between p-2 h-fit", className)}
                    id={id}
                    {...props}
                >
                    <div className={cn("flex justify-between grow items-center gap-1", value ? "opacity-100" : "opacity-55")}>
                        {value ? (
                            <>
                                <div className="flex flex-row justify-center basis-1 *:border grow">
                                    {(value?.colorHex?.length ?? 0) > 0
                                        ? (<span className="w-full h-6 rounded-2xl" style={singleColorStyle} />)
                                        : (<>
                                            <span className="w-1/2 h-6 rounded-s-2xl" style={multyColorStyle[0]} />
                                            <span className="w-1/2 h-6 rounded-e-2xl" style={multyColorStyle[1]} />
                                        </>)}
                                </div>
                                <div className="text-wrap grow-8 basis-1">
                                    {value ? value.filamentName.substring(value.filamentName.indexOf("-") + 1, value.filamentName.lastIndexOf("\t")) : placeholder}
                                </div>
                                <div className="grow basis-1">{(value?.remainingWeight ?? 870).toLocaleString()}g</div>
                            </>
                        ) : (
                            <div className="text-wrap grow-8 basis-1">
                                {placeholder}
                            </div>
                        )}

                    </div>
                    {children}
                    <ChevronsUpDown className="opacity-50" />
                    <Input type="hidden" name={`${name}-id`} value={value?.spoolId ?? ""} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={innerClassname}>
                <Command>
                    <CommandInput ref={searchRef} onKeyDown={(e) => {
                        if (e.key == "Enter" && searchRef.current.value.trim() != "") {
                            var possibleValue = list.find(s => s.filamentName == searchRef.current.value);
                            if (possibleValue) {
                                setValue(possibleValue);
                            }
                            setOpen(false);
                        }
                    }} placeholder={`Search ...`} className="h-9" />
                    <CommandList>
                        <CommandEmpty>Not found</CommandEmpty>
                        <CommandGroup>
                            {list.map((s) => {
                                const singleColorStyle = {
                                    backgroundColor: `#${s.colorHex}`
                                };
                                const multyColorStyle = [{
                                    backgroundColor: `#${s.multiColorHexes?.split(',')[0] ?? "000000"}`
                                }, {
                                    backgroundColor: `#${s.multiColorHexes?.split(',')[1] ?? "FFFFFF"}`
                                }];
                                return (
                                    <CommandItem
                                        key={s.filamentName}
                                        value={s.filamentName}
                                        onSelect={(currentValueName) => {
                                            const currentValue = list.find((l) => l.filamentName == currentValueName);
                                            setValue(currentValue);
                                            setOpen(false)
                                        }}
                                        className="justify-between"
                                    >
                                        <div className="flex flex-row justify-center basis-1 *:border grow">
                                            {(s.colorHex?.length ?? 0) > 0
                                                ? (<span className="w-full h-6 rounded-2xl" style={singleColorStyle} />)
                                                : (<>
                                                    <span className="w-1/2 h-6 rounded-s-2xl" style={multyColorStyle[0]} />
                                                    <span className="w-1/2 h-6 rounded-e-2xl" style={multyColorStyle[1]} />
                                                </>)}
                                        </div>
                                        <div className="text-wrap grow-8 basis-1">
                                            {s.filamentName.substring(s.filamentName.indexOf("-") + 1, s.filamentName.lastIndexOf("\t"))}
                                        </div>
                                        <div className="grow basis-1">{s.remainingWeight.toLocaleString()}g</div>
                                        <Check
                                            className={cn(
                                                value?.filamentName === s.filamentName ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}