"use server"
import axios from "axios";
import getConfig from "../getConfig";
import { Category } from "@/models/category";
import { cacheLife, cacheTag } from "next/cache";
import { ApiCacheTags } from "./config";

export async function getCategories() {
    "use cache"
    cacheTag(ApiCacheTags.category);
    cacheLife("hours");
    const config = await getConfig();
    return await axios.get<Category[]>(`${config.backHost}/categories`)
        .then(r => r.data);
}

export async function getCategoryReport() {
    "use cache"
    cacheTag(`${ApiCacheTags.category}-report`);
    cacheLife("hours");
    const config = await getConfig();
    return await axios.get<Category[]>(`${config.backHost}/categories/report`)
        .then(r => r.data)
}
