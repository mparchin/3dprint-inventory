import ModelContainer from "@/components/models/model-containter";
import { getModels } from "@/lib/api/models";

export default async function ModelsPage() {
    const models = await getModels();
    return <ModelContainer models={models} />;
}