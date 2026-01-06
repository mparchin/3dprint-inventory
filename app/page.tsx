import StlViewer from "@/components/stl-viewer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="w-full flex flex-row flex-wrap gap-4 p-8 justify-around">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(element => (
                <Card className="w-64" key={element}>
                    <StlViewer url="/test.stl" className="bg-card m-auto w-full aspect-square" />
                    <CardHeader>
                        <CardTitle><Link href={`/models/${element}`}>Magnetic Pisa Tower</Link></CardTitle>
                        <CardDescription className="flex justify-between"><span>D&D Dice holder</span><span>113/254g</span></CardDescription>
                    </CardHeader>
                    <CardContent>This model uses 6 magnets per level to stack them on top of eachother and stacked parts resembles the Pisa tower</CardContent>
                    <CardFooter>
                        <div className="flex gap-2 flex-wrap">
                            <Badge>D&D</Badge>
                            <Badge>DiceHolder</Badge>
                            <Badge>Magnetic</Badge>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}