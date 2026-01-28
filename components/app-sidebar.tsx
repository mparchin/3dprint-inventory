"use client"
import { BanknoteArrowDown, BanknoteArrowUp, Boxes, BoxIcon, ChevronRight, FolderOpen, Handshake, History, Locate, LogOut, PiggyBank, Printer, Settings, Spool, Tags, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import DarkThemeButton from "./dark-theme-button";
import Link from "next/link";
import { Category } from "@/models/category";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const menuItems = [
    {
        title: "Products",
        link: "#",
        parnet: "Inventory",
        icon: Boxes
    },
    {
        title: "Spools",
        link: "/spools",
        parnet: "Inventory",
        icon: Spool
    },
    {
        title: "Categories",
        link: "/categories",
        parnet: "Inventory",
        icon: FolderOpen
    },
    {
        title: "Tags",
        link: "/tags",
        parnet: "Inventory",
        icon: Tags
    },
    {
        title: "Locations",
        link: "#",
        parnet: "Inventory",
        icon: Locate
    },
    {
        title: "Print",
        link: "/print",
        parnet: "Manufacture",
        icon: Printer
    },
    {
        title: "History",
        link: "#",
        parnet: "Manufacture",
        icon: History
    },
    {
        title: "Reports",
        link: "#",
        parnet: "Commerce",
        icon: PiggyBank
    },
    {
        title: "Sells",
        link: "#",
        parnet: "Commerce",
        icon: BanknoteArrowDown
    },
    {
        title: "Invoices",
        link: "#",
        parnet: "Commerce",
        icon: BanknoteArrowUp
    },
    {
        title: "Partners",
        link: "#",
        parnet: "Commerce",
        icon: Handshake
    },
];

export default function AppSideBar({
    cats
}: {
    cats: Category[];
}) {
    const path = usePathname();
    const catsList = cats.map(c => ({
        title: c.name,
        link: `/models/${c.name}/`
    }));
    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader className="pt-3">
                <SidebarMenu>
                    <Collapsible className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <BoxIcon className={cn(path == "/" || path.startsWith("/models")
                                                    ? "text-primary"
                                                    : "", "cursor-pointer")} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Models
                                            </TooltipContent>
                                        </Tooltip>
                                        <span>Models</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </Link>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {catsList.map(cat => (
                                        <SidebarMenuSubButton key={cat.title} asChild>
                                            <Link href={cat.link}>
                                                {cat.title}
                                            </Link>
                                        </SidebarMenuSubButton>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {[...new Set(menuItems.map(item => item.parnet))].map(parent => (
                    <SidebarGroup key={parent}>
                        <SidebarGroupLabel>{parent}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.filter(item => item.parnet == parent).map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.link}>
                                                {item.icon != null ? (
                                                    <Tooltip>
                                                        <TooltipTrigger className="cursor-pointer">
                                                            <item.icon className={path.startsWith(item.link) ? "text-primary" : ""} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {item.title}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ) : <></>}
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <DarkThemeButton />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Settings />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Settings
                                    </TooltipContent>
                                </Tooltip>
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <User />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Account
                                    </TooltipContent>
                                </Tooltip>
                                <span>Account</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <LogOut className="text-destructive" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Logout
                                    </TooltipContent>
                                </Tooltip>
                                <span>Logout</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}