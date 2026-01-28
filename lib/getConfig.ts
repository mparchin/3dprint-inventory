"use server"

import { Config } from "@/models/config"
import { cacheLife, cacheTag } from "next/cache";

export default async function getConfig(): Promise<Config> {
    "use cache"
    cacheTag('config');
    cacheLife('max');
    return Promise.resolve({
        frontHost: process.env.Front_Host,
        backHost: process.env.Back_Host,
    } as Config);
}