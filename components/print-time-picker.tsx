"use client"

import { Info } from "lucide-react";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useEffect, useRef, useState } from "react";

interface Time {
    hours: number,
    minutes: number
}

export default function PrintTimePicker({
    name,
    initValue
}: {
    name: string;
    initValue?: Time
}) {
    const hourRef = useRef<HTMLInputElement>(null!);
    const minuteRef = useRef<HTMLInputElement>(null!);
    const [value, setValue] = useState<Time>(initValue ?? { hours: 0, minutes: 0 });
    useEffect(() => {
        hourRef.current.value = value.hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
        });
        minuteRef.current.value = value.minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
        });
    }, [value])
    return (
        <Field orientation={"horizontal"}>
            <FieldLabel htmlFor={"duration-" + name}>Time:</FieldLabel>
            <div className="flex gap-1" id={"duration-" + name}>
                <Input name={name + "-h"} onKeyDown={(e) => {
                    var newValue: Time = {
                        hours: value.hours,
                        minutes: value.minutes
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    switch (e.key) {
                        case "0":
                            newValue.hours = (newValue.hours * 10) % 100;
                            break;
                        case "1":
                            newValue.hours = (newValue.hours * 10 + 1) % 100;
                            break;
                        case "2":
                            newValue.hours = (newValue.hours * 10 + 2) % 100;
                            break;
                        case "3":
                            newValue.hours = (newValue.hours * 10 + 3) % 100;
                            break;
                        case "4":
                            newValue.hours = (newValue.hours * 10 + 4) % 100;
                            break;
                        case "5":
                            newValue.hours = (newValue.hours * 10 + 5) % 100;
                            break;
                        case "6":
                            newValue.hours = (newValue.hours * 10 + 6) % 100;
                            break;
                        case "7":
                            newValue.hours = (newValue.hours * 10 + 7) % 100;
                            break;
                        case "8":
                            newValue.hours = (newValue.hours * 10 + 8) % 100;
                            break;
                        case "9":
                            newValue.hours = (newValue.hours * 10 + 9) % 100;
                            break;
                        default:
                            return;
                    }
                    newValue.hours = newValue.hours % 60;
                    setValue(newValue);
                }} ref={hourRef} className="grow p-2 max-w-10" placeholder="00" />
                <p className="pt-1">:</p>
                <Input name={name + "-m"} onKeyDown={(e) => {
                    var newValue: Time = {
                        hours: value.hours,
                        minutes: value.minutes
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    switch (e.key) {
                        case "0":
                            newValue.minutes = (newValue.minutes * 10) % 100;
                            break;
                        case "1":
                            newValue.minutes = (newValue.minutes * 10 + 1) % 100;
                            break;
                        case "2":
                            newValue.minutes = (newValue.minutes * 10 + 2) % 100;
                            break;
                        case "3":
                            newValue.minutes = (newValue.minutes * 10 + 3) % 100;
                            break;
                        case "4":
                            newValue.minutes = (newValue.minutes * 10 + 4) % 100;
                            break;
                        case "5":
                            newValue.minutes = (newValue.minutes * 10 + 5) % 100;
                            break;
                        case "6":
                            newValue.minutes = (newValue.minutes * 10 + 6) % 100;
                            break;
                        case "7":
                            newValue.minutes = (newValue.minutes * 10 + 7) % 100;
                            break;
                        case "8":
                            newValue.minutes = (newValue.minutes * 10 + 8) % 100;
                            break;
                        case "9":
                            newValue.minutes = (newValue.minutes * 10 + 9) % 100;
                            break;
                        default:
                            return;
                    }
                    newValue.minutes = newValue.minutes % 60;
                    setValue(newValue);
                }} ref={minuteRef} className="grow p-2 max-w-10" placeholder="00" />
                <Tooltip>
                    <TooltipTrigger type="button">
                        <Info className="scale-75" type="button" />
                    </TooltipTrigger>
                    <TooltipContent>
                        Print time for a single model with sliced settings in hh:mm format
                    </TooltipContent>
                </Tooltip>
            </div>
        </Field>);
}