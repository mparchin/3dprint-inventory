"use client"

import { Badge } from "lucide-react";
import StlViewer from "./stl-viewer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import getConfig from "@/hooks/getConfig";
import { Suspense, use } from "react";

export default function () {
    // const config = use(getConfig());
    return (
        <Card className="w-64">
            <StlViewer url={"https://" + "inventory.ho.me" + "/test.stl"} className="bg-card m-auto w-full aspect-square" />
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
    );
}