"use server"
import { cacheLife, cacheTag } from "next/cache";
import getConfig from "../getConfig";
import axios from "axios";
import { Spool } from "@/models/spool";
import { ApiCacheTags } from "./config";

export async function getSpools() {
    "use cache"
    cacheTag(ApiCacheTags.spool);
    cacheLife("minutes");
    const config = await getConfig();
    return await axios.get<Spool[]>(`${config.backHost}/spools`)
        .then(r => r.data);
}

export async function getLowestPricePerG() {
    "use cache"
    cacheTag(`${ApiCacheTags.spool}-lowestPricePerG`);
    cacheLife("days");
    const config = await getConfig();
    return await axios.get<number>(`${config.backHost}/spools/lowestPricePerG`)
        .then(r => r.data);
}
