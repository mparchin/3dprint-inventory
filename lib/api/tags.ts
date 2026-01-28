"use server"
import { cacheLife, cacheTag } from "next/cache";
import getConfig from "../getConfig";
import axios from "axios";
import { Tag } from "@/models/tag";
import { ApiCacheTags } from "./config";

export async function getTags() {
    "use cache"
    cacheTag(ApiCacheTags.tag);
    cacheLife("hours");
    const config = await getConfig();
    return await axios.get<Tag[]>(`${config.backHost}/tags`)
        .then(r => r.data);
}

export async function getTagReport() {
    "use cache"
    cacheTag(`${ApiCacheTags.tag}-report`);
    cacheLife("hours");
    const config = await getConfig();
    return await axios.get<Tag[]>(`${config.backHost}/tags/report`)
        .then(r => r.data);
}

