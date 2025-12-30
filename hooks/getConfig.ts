"use server"

import { Config } from "@/models/config"

export default async function getConfig(): Promise<Config> {
    return Promise.resolve({
        frontHost: process.env.Front_Host
    } as Config);
}