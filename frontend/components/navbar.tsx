"use client"

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    User,
    Search,
    History,
    Truck,
    ShoppingCart,
    LogOut
} from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()
    if (pathname === "/login" || pathname === "/signup") {
        return null
    }
    
    return (
    <div className="flex justify-center p-4">
        <Menubar className="inline-flex h-12 p-2">
            <MenubarMenu>
                <MenubarTrigger><User /></MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><Search /></MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><History /></MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><Truck /></MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><ShoppingCart /></MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger><LogOut /></MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    </div>
    )
}
