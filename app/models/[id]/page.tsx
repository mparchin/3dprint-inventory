import ComboBox from "@/components/combo-box";
import ComboBoxTags from "@/components/combo-box-tags";
import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import getConfig from "@/lib/getConfig";
import { Form } from "@base-ui/react";
import IdHiddenInput from "./id-hidden-input";

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
    formData.forEach((value, key) => console.log(`${key}: ${value}`));
}

export default async function Page() {
    const lowestSpoolCostPerG = 1200 / 1000;
    const config = await getConfig();
    return (
        <div className="w-full p-8">
            <Form action={onSubmit}>
                <FieldSet className="lg:grid grid-cols-2">
                    <IdHiddenInput />
                    <Field className="max-w-md">
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" name="name" placeholder="Pisa magnetic tower" required />
                    </Field>
                    <Field className="max-w-md">
                        <FieldLabel htmlFor="shortDescription">Short description</FieldLabel>
                        <FieldDescription className="p-2">Should be a very short description of model containing no more than 10 or some words</FieldDescription>
                        <Input id="shortDescription" name="shortDescription" placeholder="D&D dice holder" required />
                    </Field>

                    <Field className="max-w-md row-span-2">
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" name="description" className="h-full min-h-40" placeholder="This model uses 6 magnets per level to stack them on top of eachother and stacked parts resembles the Pisa tower" />
                    </Field>

                    <Field className="max-w-md row-span-2">
                        <FieldLabel htmlFor="specifications">Print specifications</FieldLabel>
                        <FieldDescription className="p-2">This should include any changes made in slicer software of your choice including profile changes or any post-processing changes or procedure. The idea is to be able to use this to slice this model even if slicer file is not available</FieldDescription>
                        <Textarea id="specifications" name="specifications" className="h-full min-h-40" placeholder={"Based on cura visual normal profile: \nseaming hide smart sharpest corner \n8 layers of top layer surface \n7 layer of bottom layer surface \ninfil 20% cubic \nz-hop enabled \nwith changes to profile: \nwall count 3"} />
                    </Field>


                    <Field className="max-w-md">
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <FieldDescription className="p-2">A category that best descibes this model more like the first word that comes to mind when you are describing the model (use plural form)</FieldDescription>
                        <ComboBox list={cats} id="category" name="category" placeholder="Dice towers" innerClassname="p-0 w-md" />
                    </Field>
                    <Field className="max-w-md">
                        <FieldLabel htmlFor="tags">Tags</FieldLabel>
                        <FieldDescription className="p-2">Use any class of words that this model can have in similarity to other models to classify them as same</FieldDescription>
                        <ComboBoxTags list={cats} id="tags" name="tags" placeholder="D&D Dice-holder Magnetic" innerClassname="p-0 w-md" />
                    </Field>

                    <Field className="max-w-md row-span-4">
                        <FieldLabel htmlFor="files">Files</FieldLabel>
                        <FieldDescription className="p-2">Any STL model files, slicer files, gcode or images of print and assambled model</FieldDescription>
                        <FileUploader id="files" name="files" config={config} />
                    </Field>

                    <Field className="max-w-md">
                        <FieldLabel htmlFor="adcosts">Additional Costs</FieldLabel>
                        <FieldDescription className="p-2">Any additional costs (in KT) of printing or assambly of this model with sliced settings, divided by lowest price of material which is: {lowestSpoolCostPerG} KT/g</FieldDescription>
                        <InputGroup>
                            <InputGroupInput id="adcost" name="adcost" type="number" placeholder="0" />
                            <InputGroupAddon align={"inline-end"}>
                                g
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>

                    <Field className="max-w-md">
                        <FieldLabel htmlFor="ValueDividedByCost">Value/Cost</FieldLabel>
                        <FieldDescription className="p-2">This will be used to determine raw sell value of assambled models using this formula: <br /> (total combined cost of models in grams) x (material cost) x (this value) = (raw value)</FieldDescription>
                        <Input id="ValueDividedByCost" name="ValueDividedByCost" type="number" placeholder="2" defaultValue={2} required />
                    </Field>


                </FieldSet>
                <div className="lg:grid grid-cols-2 mt-4">
                    <div className="max-w-md flex flex-row gap-1 col-start-2 ml-3">
                        <div className="grow"></div>
                        <Button type="reset" variant={"destructive"} className="">Cancel</Button>
                        <Button type="submit" className="">Update</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}