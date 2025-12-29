import { ComponentExample } from "@/components/component-example";
import StlViewer from "@/components/stl-viewer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "process";

export default function Page() {
    const host = env.REACT_APP_HOST;
    return (
        <div >
            <div className="w-full flex flex-row flex-wrap gap-4 p-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(element => (
                    <Card key={element} className="w-64">
                        <StlViewer url={"https://" + host + "/test.stl"} className="bg-card m-auto w-full aspect-square" />
                        <CardHeader>
                            <CardTitle>Magnetic Pisa Tower</CardTitle>
                            <CardDescription className="flex justify-between"><span>D&D Dice holder</span><span>113/254g</span></CardDescription>
                        </CardHeader>
                        <CardContent>This model uses 6 magnets per level to stack them on top of eachother and stacked parts resembles pisa tower</CardContent>
                        <CardFooter>
                            <div className="flex gap-2 flex-wrap">
                                <Badge>D&D</Badge>
                                <Badge>DiceHolder</Badge>
                                <Badge>Magnetic</Badge>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
                {/* <div className="grow"></div> */}
            </div>
            <ComponentExample />
            <ComponentExample />
            <StlViewer url={"https://" + host + "/test.stl"} className="w-52 h-52 m-auto" />
        </div>
    );
}