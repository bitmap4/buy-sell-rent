"use client"

import { useState } from "react"
import { OrdersList } from "./orders-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
    const [activeTab, setActiveTab] = useState("sold")

    return (
        <div className="space-y-6 p-6 lg:p-16">
            <Tabs 
                defaultValue="sold" 
                className="flex flex-col justify-center items-center"
                onValueChange={setActiveTab}
            >
                <TabsList className="w-fit">
                    <TabsTrigger value="sold">Sold</TabsTrigger>
                    <TabsTrigger value="bought">Bought</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="sold" className="w-full">
                    <OrdersList type={activeTab} />
                </TabsContent>
                <TabsContent value="bought" className="w-full">
                    <OrdersList type={activeTab} />
                </TabsContent>
                <TabsContent value="pending" className="w-full">
                    <OrdersList type={activeTab} />
                </TabsContent>
            </Tabs>
        </div>
    )
}