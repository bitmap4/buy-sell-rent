"use client"

import { 
  SidebarIcon,
  Plus,
  Sun, Moon
} from "lucide-react"
import { usePathname } from "next/navigation"

import { SearchForm } from "@/app/home/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

const pathMap: Record<string, string> = {
  home: "Home",
  item: "Item",
  cart: "Cart",
  orders: "Orders",
  profile: "Profile",
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname()
  
  // Remove leading slash and split into segments
  const segments = pathname.slice(1).split('/')
  
  return (
    <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1
              const path = `/${segments.slice(0, index + 1).join('/')}`
              const displayName = pathMap[segment] || segment

              return (
                <BreadcrumbItem key={path}>
                  {isLast ? (
                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={path}>{displayName}</BreadcrumbLink>
                  )}
                  {!isLast && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
        {/* add button for adding a new item for selling, along with an icon */}
        <Button variant="outline" size="sm" className="ml-auto">
          <Plus className="mr-2" />
          Sell Item
        </Button>
        <Button variant="ghost" className="h-8 w-8">
          <Sun />
        </Button>
      </div>
    </header>
  )
}
