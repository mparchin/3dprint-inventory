import { Category } from "./category";
import { File } from "./file";
import { ModelTag } from "./mdoelTag";

export interface Model {
    modelId: number;
    name: string;
    description: string;
    shortDescription: string;
    printSpecifications: string;
    category: Category;
    files: File[];
    modelTags: ModelTag[];
    additionalCostsg?: number;
    valueToCostRatio: number;

    totalRawWeight?: number;
    totalValueWeight?: number;
}