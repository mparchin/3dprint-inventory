import { BanknoteArrowDown, BanknoteArrowUp, Boxes, BoxIcon, ChevronRight, Handshake, History, Locate, LogOut, PiggyBank, Printer, Settings, Spool, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import DarkThemeButton from "./dark-theme-button";
import Link from "next/link";


const menuItems = [
    {
        title: "Products",
        link: "#",
        parnet: "Inventory",
        icon: Boxes
    },
    {
        title: "Spools",
        link: "#",
        parnet: "Inventory",
        icon: Spool
    },
    {
        title: "Locations",
        link: "#",
        parnet: "Inventory",
        icon: Locate
    },
    {
        title: "Print",
        link: "#",
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

const modelCats = [
    {
        title: "cat1",
        link: "#"
    },
    {
        title: "cat2",
        link: "#"
    },
    {
        title: "cat3",
        link: "#"
    },
];

export default function AppSideBar() {
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
                                                <BoxIcon className="text-primary" />
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
                                    {modelCats.map(cat => (
                                        <SidebarMenuSubItem key={cat.title}>
                                            <a href={cat.link}>
                                                {cat.title}
                                            </a>
                                        </SidebarMenuSubItem>
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
                                                        <TooltipTrigger>
                                                            <item.icon />
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