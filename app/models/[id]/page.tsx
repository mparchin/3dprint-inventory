import ComboBox from "@/components/combo-box";
import ComboBoxTags from "@/components/combo-box-tags";
import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import getConfig from "@/lib/getConfig";
import { Form } from "@base-ui/react";

const cats = [
    {
        id: 1,
        name: "cat1"
    },
    {
        id: 2,
        name: "cat2"
    },

    {
        id: 3,
        name: "cat3"
    },

];

export async function onSubmit(formData: FormData) {
    "use server"
    console.log(formData.get("category"));
    console.log(formData.get("id"));
}

export default async function Page() {
    const lowestSpoolCostPerG = 1200 / 1000;
    const config = await getConfig();
    return (
        <div className="w-full p-8">
            <Form action={onSubmit}>
                <FieldSet className="lg:grid grid-cols-2">
                    <Input type="hidden" name="id" value={1} className="hidden" />
                    <Field className="max-w-md">
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" name="name" placeholder="Name of your model" required />
                    </Field>
                    <Field className="max-w-md col-start-1">
                        <FieldLabel htmlFor="name">Short description</FieldLabel>
                        <Input id="shortDescription" name="shortDescription" placeholder="One line description" required />
                    </Field>

                    <Field className="max-w-md row-span-2 col-start-1">
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" name="description" className="h-full" placeholder="Description" />
                    </Field>

                    <Field className="max-w-md row-span-2 col-start-1">
                        <FieldLabel htmlFor="specifications">Print specifications</FieldLabel>
                        <Textarea id="specifications" name="specifications" className="h-full" placeholder="Print specifications" />
                    </Field>


                    <Field className="max-w-md row-start-1 col-start-2">
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <ComboBox list={cats} id="category" name="category" placeholder="Dice towers" innerClassname="p-0 w-md" />

                    </Field>
                    <Field className="max-w-md row-start-2 col-start-2">
                        <FieldLabel htmlFor="tags">Tags</FieldLabel>
                        <ComboBoxTags list={cats} id="tags" name="tags" placeholder="D&D" innerClassname="p-0 w-md" />

                    </Field>

                    <Field className="max-w-md row-span-4 row-start-3 col-start-2">
                        <FieldLabel htmlFor="files">Files</FieldLabel>
                        <FileUploader id="files" config={config} />
                    </Field>

                    <Field className="max-w-md col-start-1">
                        <FieldLabel htmlFor="adcosts">Additional Costs</FieldLabel>
                        <InputGroup>
                            <InputGroupInput id="adcost" type="number" placeholder="0" />
                            <InputGroupAddon align={"inline-end"}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        g
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Any costs of printing or assambly of this model with sliced settings divided by lowest price of material which is: {lowestSpoolCostPerG} KT/g
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field className="max-w-md col-start-2">
                        <FieldLabel htmlFor="name">Cost to Value Factor</FieldLabel>
                        <Input id="shortDescription" name="shortDescription" placeholder="One line description" required />
                    </Field>

                    <div className="max-w-md col-start-2 flex flex-row gap-1">
                        <div className="grow"></div>
                        <Button type="reset" variant={"destructive"} className="">Cancel</Button>
                        <Button type="submit" className="">Update</Button>
                    </div>
                </FieldSet>
            </Form>
        </div>
    );
}