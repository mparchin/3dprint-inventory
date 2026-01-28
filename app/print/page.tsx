import getConfig from "@/lib/getConfig";
import { Model } from "@/models/model";
import axios from "axios";
import PrintForm from "./print-form";
import { Spool } from "@/models/spool";

export default async function PrintPage() {
    const config = await getConfig();
    const models = await axios.get<Model[]>(`${config.backHost}/models`)
        .then(r => r.data);
    const spools = await axios.get<Spool[]>(`${config.backHost}/spools`)
        .then(r => r.data);
    return (
        <form className="p-8">
            <PrintForm models={models} spools={spools} />
        </form>
    );
}