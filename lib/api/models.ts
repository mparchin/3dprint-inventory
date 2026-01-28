"use server"
import { cacheLife, cacheTag, updateTag } from "next/cache";
import getConfig from "../getConfig";
import { Model } from "@/models/model";
import axios from "axios";
import { ApiCacheTags } from "./config";

export async function getModels() {
    "use cache"
    cacheTag(ApiCacheTags.model);
    cacheLife("hours");
    const config = await getConfig();
    return await axios.get<Model[]>(`${config.backHost}/models`)
        .then(r => r.data);
}

export async function getModel(modelId: number) {
    "use cache"
    cacheTag(`${ApiCacheTags.model}-${modelId}`);
    cacheLife("hours");
    const config = await getConfig();
    return await axios.get<Model>(`${config.backHost}/models/${modelId}`)
        .then(r => r.data);
}

export async function deleteModel(modelId: number) {
    const config = await getConfig();
    await axios.delete(`${config.backHost}/models/${modelId}`);
    updateTag(`${ApiCacheTags.model}-${modelId}`);
    updateTag(ApiCacheTags.model);
}

export async function postModel(model: Model) {
    const config = await getConfig();
    updateTag(ApiCacheTags.model);
    updateTag(ApiCacheTags.category);
    updateTag(ApiCacheTags.tag);
    return await axios.post<Model>(`${config.backHost}/models`, model)
        .then(r => r.data);
}

export async function putModel(model: Model) {
    const config = await getConfig();
    updateTag(`${ApiCacheTags.model}-${model.modelId}`);
    updateTag(ApiCacheTags.model);
    return await axios.put<Model>(`${config.backHost}/models/${model.modelId}`, model)
        .then(r => r.data);
}