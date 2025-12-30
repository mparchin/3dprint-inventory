import { ComponentExample } from "@/components/component-example";
import ModelCard from "@/components/model-card";
import StlViewer from "@/components/stl-viewer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useConfig from "@/hooks/getConfig";

export default function Page() {
    return (
        <div >
            <div className="w-full flex flex-row flex-wrap gap-4 p-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(element => (
                    <ModelCard key={element} />
                ))}
                {/* <div className="grow"></div> */}
            </div>
            {/* <ComponentExample />
            <ComponentExample /> */}
            {/* <StlViewer url={"https://" + host + "/test.stl"} className="w-52 h-52 m-auto" /> */}
        </div>
    );
}