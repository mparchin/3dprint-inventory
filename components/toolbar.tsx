"use client"

import { useParams, usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Archive, Plus } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export default function toolbar({
    handleDeleteModel
}: {
    handleDeleteModel: (modelId: number) => Promise<void>;
}) {
    const path = usePathname();
    const params = useParams();
    const handleDelete = () => {
        let modelId = Number(params.id);
        if (modelId > 0)
            handleDeleteModel(modelId);
    };
    return (
        <div className="w-full inline-flex border-b pt-1 pb-1">
            <SidebarTrigger className="ml-2 mt-1" />
            <Separator orientation="vertical" className="mx-2 mt-2 mb-1 data-[orientation=vertical]:h-6 w-1 bg-sidebar-border" />
            <Breadcrumb className="flex-1 p-1.5 mt-1">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Inventory</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {
                        path == "/" ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>Models</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : path.startsWith("/categories") ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>Categories</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : path.startsWith("/tags") ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>Tags</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : path.startsWith("/spools") ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>Spools</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : path.startsWith("/print") ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>Print</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : path.startsWith("/models/") ? (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Models</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                {
                                    params.cat != undefined && params.id != undefined ? (
                                        <>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={`/models/${params.cat}`}>{decodeURI(params.cat?.toString() ?? "")}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                        </>
                                    )
                                        : params.cat != undefined && params.id == undefined ? (
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{decodeURI(params.cat?.toString() ?? "")}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        )
                                            : <></>
                                }
                                {
                                    params.id == "new" ? (
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>New</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    ) : Number(params.id) > 0 ? (
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Edit</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    ) : <></>}
                            </>
                        ) : <></>
                    }
                </BreadcrumbList>
            </Breadcrumb>
            {path == "/" || (path.startsWith("/models/") && params.id == undefined) ? (
                <Link href="/models/-/edit/new">
                    <Button size={"icon"} type="button" className="mr-2 cursor-pointer">
                        <Plus />
                    </Button>
                </Link>
            )
                : path.startsWith("/models/") && Number(params.id) > 0 ? (
                    <Button size={"icon"} type="button" className="mr-2 cursor-pointer" variant={"destructive"} onClick={handleDelete}>
                        <Archive />
                    </Button>
                )
                    : (<></>)}
        </div>
    );
}