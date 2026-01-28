"use client"
import { Upload, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Field, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PrintTimePicker from "./print-time-picker";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Config } from "@/models/config";
import { TempFile } from "@/models/TempFile";
import axios, { AxiosProgressEvent } from "axios";


export default function FileUploader({
    id,
    name,
    config,
    files,
    lowestSpoolCostPerG
}: {
    id?: string;
    name: string;
    config: Config;
    files?: TempFile[],
    lowestSpoolCostPerG: number
}) {
    const ref = useRef<HTMLInputElement>(null!);
    const [tempFiles, setTempFiles] = useState<TempFile[]>(files ?? []);
    useEffect(() => {
        for (let i = 0; i < tempFiles.length; i++) {
            if (tempFiles[i] == undefined || tempFiles[i].progress != 0)
                continue;
            // set for upload
            setTempFiles(old => old.map((f, index) => index == i ? {
                name: f.name,
                path: f.path,
                progress: 1,
                size: f.size,
                inputFileIndex: f.inputFileIndex,
                fileId: f.fileId,
                url: f.url
            } : f));
            const formData = new FormData();
            const index = tempFiles[i].inputFileIndex;
            formData.append(`file-${index}`, ref.current.files![index]);
            axios.postForm(`${config.backHost}/files`, formData, {
                onUploadProgress: (e: AxiosProgressEvent) => {
                    if (tempFiles[i]) {
                        let progress = Math.round((e.progress ?? 0) * 100);
                        progress = progress <= 1 ? 1 : progress;
                        setTempFiles(old => old.map((f, index) => index == i ? {
                            name: f.name,
                            path: f.path,
                            progress: progress,
                            size: f.size,
                            inputFileIndex: f.inputFileIndex,
                            fileId: f.fileId,
                            url: f.url
                        } : f));
                    };
                }
            }).then(response => {
                const newModel = response.data as TempFile[];
                if (tempFiles[i]) {
                    setTempFiles(old => old.map((f, index) => index == i ? {
                        name: f.name,
                        path: newModel[0].path,
                        progress: 100,
                        size: f.size,
                        inputFileIndex: f.inputFileIndex,
                        fileType: {
                            fileTypeId: newModel[0].fileType!.fileTypeId,
                            name: newModel[0].fileType!.name
                        },
                        fileId: f.fileId,
                        url: newModel[0].url
                    } : f))
                }
            })
        }
        ref.current.value = "";
    }, [tempFiles.length]);

    const handleDelete = (model?: TempFile) => {
        setTempFiles(old => old.filter((f) => f.name !== model?.name));
    };

    const handleUpload = () => {
        const filesCount = ref.current.files?.length ?? 0;
        if (filesCount > 0) {
            for (let i = 0; i < filesCount; i++) {
                setTempFiles(old => [...old, {
                    name: ref.current.files!.item(i)!.name,
                    path: "",
                    progress: 0,
                    url: "",
                    size: ref.current.files!.item(i)!.size,
                    inputFileIndex: i,
                    fileId: 0
                }]);
            }
        } else {
            ref.current.click();
        }
    };

    return (
        <div className="border rounded-2xl p-2">
            <div className="mb-4 sm:grid grid-cols-2">
                {tempFiles.map((file, index) =>
                    file.progress != 100
                        ? <InProgressFile key={file.name} name={`${name}-${index}`} model={file} onDelete={handleDelete} />
                        : file.fileType?.name === "STL" ? <STLFile key={file.name} name={`${name}-${index}`} model={file} onDelete={handleDelete} lowestSpoolCostPerG={lowestSpoolCostPerG} />
                            : file.fileType?.name === "Image" ? <ImageFile key={file.name} name={`${name}-${index}`} model={file} onDelete={handleDelete} />
                                : <OtherTypeFile key={file.name} name={`${name}-${index}`} model={file} onDelete={handleDelete} />
                )}
            </div>
            <div className="flex flex-row gap-2">
                <Input type="hidden" name={`${name}-count`} value={tempFiles.length} />
                <Input id={id} type="file" ref={ref} className="cursor-pointer" multiple />
                <Button variant={"default"} size={"icon"} type="button" onClick={handleUpload}><Upload /></Button>
            </div>
        </div>
    );
}

function RemoveButton({
    onClick
}: {
    onClick?: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <Button className="col-start-11 row-start-1 z-10 cursor-pointer" variant={"ghost"} size={"icon"} type="button" onClick={onClick} >
            <X className="text-destructive scale-125" type="button" />
        </Button>
    );
}

function InProgressFile({
    name,
    model,
    onDelete,
}: {
    name: string;
    model?: TempFile;
    onDelete?: (model?: TempFile) => void;
}) {
    const handleClick = onDelete ? () => onDelete(model) : undefined;
    return (
        <div className="sm:w-48 w-72 aspect-square grid grid-cols-12 grid-rows-12 bg-sidebar rounded-2xl ml-auto mr-auto mb-2">
            <RemoveButton onClick={handleClick} />
            <div className="w-full h-full col-span-12 row-span-12 row-start-1 col-start-1 z-0 flex flex-col p-3 justify-around">
                <Progress className="" value={model?.progress} />
                <DefaultInputs name={name} model={model} isValid={false} />
            </div>
        </div>
    );
}

function OtherTypeFile({
    name,
    model,
    onDelete,
}: {
    name: string;
    model?: TempFile;
    onDelete?: (model?: TempFile) => void;
}) {
    const handleClick = onDelete ? () => onDelete(model) : undefined;
    return (
        <div className="sm:w-48 w-72 aspect-square grid grid-cols-12 grid-rows-12 bg-sidebar rounded-2xl ml-auto mr-auto mb-2">
            <RemoveButton onClick={handleClick} />
            <div className="w-full col-span-12 row-span-12 row-start-1 col-start-1 z-0 flex flex-col gap-2 p-4">
                <p className="grow wrap-break-word">{model?.name}</p>
                <DefaultInputs name={name} model={model} />
            </div>
        </div>
    );
}

function STLFile({
    name,
    model,
    onDelete,
    lowestSpoolCostPerG
}: {
    name: string;
    model?: TempFile;
    onDelete?: (model?: TempFile) => void;
    lowestSpoolCostPerG: number;
}) {
    const handleClick = onDelete ? () => onDelete(model) : undefined;
    return (
        <div className="sm:w-48 w-72 row-span-2 grid grid-cols-12 grid-rows-12 bg-sidebar rounded-2xl ml-auto mr-auto mb-2">
            <RemoveButton onClick={handleClick} />
            <div className="w-full col-span-12 row-span-12 row-start-1 col-start-1 z-0 flex flex-col gap-2 p-4">
                <p className="grow wrap-break-word">{model?.name}</p>
                <DefaultInputs name={name} model={model} />
                <Field orientation={"horizontal"}>
                    <FieldLabel htmlFor="grams">Weight:</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="grams" name={`${name}-grams`} type="number" defaultValue={model?.weight} placeholder="32" required />
                        <InputGroupAddon align={"inline-end"}>
                            <Tooltip>
                                <TooltipTrigger type="button">
                                    g
                                </TooltipTrigger>
                                <TooltipContent>
                                    Sliced weight of the model
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Field orientation={"horizontal"}>
                    <FieldLabel htmlFor="repeats">Repeatations:</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="repeats" name={`${name}-repeats`} type="number" placeholder="1" defaultValue={model?.repeatations ?? 1} required />
                        <InputGroupAddon align={"inline-end"}>
                            <Tooltip>
                                <TooltipTrigger type="button">
                                    #
                                </TooltipTrigger>
                                <TooltipContent>
                                    How many times this model is used in final assambly of the object
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <Field orientation={"horizontal"}>
                    <FieldLabel htmlFor="elec">Electricity:</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="elec" name={`${name}-elec`} type="number" defaultValue={model?.electricityCostg} placeholder="12" />
                        <InputGroupAddon align={"inline-end"}>
                            <Tooltip>
                                <TooltipTrigger type="button">
                                    g
                                </TooltipTrigger>
                                <TooltipContent>
                                    Electricity cost of printing this model with sliced settings divided by lowest price of material which is: {lowestSpoolCostPerG} KT/g
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <PrintTimePicker name={name} initValue={model?.printTime ? ({
                    hours: Number(model.printTime.substring(0, model.printTime.indexOf(':'))),
                    minutes: Number(model.printTime.substring(model.printTime.indexOf(':') + 1, model.printTime.indexOf(':') + 3))
                }) : undefined} />
            </div>
        </div>
    );
}

function ImageFile({
    name,
    model,
    onDelete,
}: {
    name: string;
    model?: TempFile;
    onDelete?: (model?: TempFile) => void;
}) {
    const handleClick = onDelete ? () => onDelete(model) : undefined;
    return (
        <div className="sm:w-48 w-72 grid grid-cols-12 grid-rows-12 bg-sidebar rounded-2xl ml-auto mr-auto mb-2">
            <RemoveButton onClick={handleClick} />
            <DefaultInputs name={name} model={model} />
            <img src={model?.url} alt={model?.name} className="col-span-12 row-span-12 row-start-1 col-start-1 z-0 rounded-2xl m-auto" />
        </div>
    );
}

function DefaultInputs({
    name,
    model,
    isValid = true,
}: {
    name: string;
    model?: TempFile;
    isValid?: boolean
}) {
    return (<>
        <Input type="hidden" name={`${name}-valid`} value={isValid ? 1 : 0} />
        <Input type="hidden" name={name} value={model?.path ?? ""} />
        <Input type="hidden" name={`${name}-id`} value={model?.fileId ?? 0} />
        <Input type="hidden" name={`${name}-type-id`} value={model?.fileType?.fileTypeId ?? 1} />
        <Input type="hidden" name={`${name}-type-name`} value={model?.fileType?.name ?? ""} />
        <Input type="hidden" name={`${name}-size`} value={model?.size ?? 1} />
    </>);
}