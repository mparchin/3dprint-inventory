"use client"

import { useParams, usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export default function toolbar() {
    const path = usePathname();
    const params = useParams();
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
                        ) : path.startsWith("/models/") ? (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Models</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                {params.id == "new" ? (
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
            {path == "/" ? (
                <Link href="/models/new">
                    <Button size={"icon"} className="mr-2" variant={"link"}>
                        <Plus className="text-primary" />
                    </Button>
                </Link>
            ) : (<></>)}
        </div>
    );
}