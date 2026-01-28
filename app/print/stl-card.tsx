import SpoolComboBox from "@/components/spool-combo-box";
import StlViewer from "@/components/stl-viewer";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { File } from "@/models/file";
import { Spool } from "@/models/spool";

export default function STLCard({
    file,
    spools
}: {
    file: File;
    spools: Spool[];
}) {
    const name = file.path.substring((file.path.lastIndexOf('/') ?? -1) + 1);
    return (
        <Card className="w-xs m-auto">
            <StlViewer url={file.url ?? "/test.stl"}
                className="bg-card m-auto w-full aspect-square" />
            <CardHeader>
                <CardTitle>
                    {file.repeatations} x {name}
                </CardTitle>
                <CardAction>
                    {(file.weight ?? 1) * (file.repeatations ?? 1)}g
                </CardAction>
            </CardHeader>
            <CardContent>
                <SpoolComboBox spools={spools} id="model" name="model" placeholder="Porima black"
                    innerClassname="p-0 w-xs" className="w-full" defaultSpool={undefined} />
            </CardContent>
        </Card>
    );
}