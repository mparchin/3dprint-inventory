"use client"
import ComboBox from "@/components/combo-box";
import ComboBoxTags from "@/components/combo-box-tags";
import FileUploader from "@/components/file-uploader";
import ModelComboBox from "@/components/model-combo-box";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/models/category";
import { Model } from "@/models/model";
import { Spool } from "@/models/spool";
import { useParams } from "next/navigation";
import STLCard from "./stl-card";

export default function PrintForm({
    models,
    spools
}: {
    models: Model[];
    spools: Spool[];
}) {
    const params = useParams();
    const selectedModel = models.find(m => m.category.name == decodeURI(params.cat?.toString() ?? "")
        && m.name == decodeURI(params.name?.toString() ?? ""));

    return (
        <FieldSet className="lg:grid grid-cols-2">
            <Input type="hidden" name="id" value={params.id == 'new' ? 0 : params.id} />

            <Field className="max-w-md">
                <FieldLabel htmlFor="model">Model</FieldLabel>
                <FieldDescription className="p-2">Select a model using its catagory and name to choose spools for printing</FieldDescription>
                <ModelComboBox models={models} id="model" name="model"
                    innerClassname="p-0 w-md" defaultModel={selectedModel} disabled={selectedModel != undefined} />
            </Field>
            <Field className="max-w-md">
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription className="p-2">Make sure to include colors and any other descerning factors into the name</FieldDescription>
                <Input id="name" name="name" placeholder="Pisa magnetic tower black/orange" required />
            </Field>
            <FieldSeparator className="col-span-2" />
            <Field className="col-span-2 row-span-4">
                <FieldLabel htmlFor="model">Spools</FieldLabel>
                <FieldDescription className="p-2">Select spools to print this model with</FieldDescription>
                <div className="col-span-2 flex flex-wrap gap-4">
                    {selectedModel?.files.filter(f => f.fileType.name == "STL").map(f => (
                        <STLCard file={f} spools={spools} key={f.path} />
                    ))}
                </div>
            </Field>
            <FieldSeparator className="col-span-2" />

        </FieldSet>
    );
}