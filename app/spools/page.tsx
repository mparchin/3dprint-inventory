import { getSpools } from "@/lib/api/spools";
import SpoolsTable from "./spools-table";

export default async function SpoolsPage() {
    const spools = await getSpools();
    return <div className="p-4">
        <SpoolsTable spools={spools} />
    </div>;
}