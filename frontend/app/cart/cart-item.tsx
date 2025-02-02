"use client"

import { Flex, Link, Image, Stack, Text, Grid, Separator } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
// import {
//     NumberInputField,
//     NumberInputRoot,
// } from "@/components/ui/number-input"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"

interface CartItemProps {
    item: {
        id: number
        name: string
        color: string
        size: string
        price: number
        quantity: number
        image: string
        hasGiftWrapping: boolean
    }
}

export function CartItem({ item }: CartItemProps) {
    return (
        // <Flex gap={6} p={4} borderWidth={0} borderRadius="md" >
        <Grid 
            templateColumns={{ 
                base: "100px 1fr",     // 2 columns on mobile
                lg: "100px 1fr 100px"  // 3 columns on desktop
            }}
            templateRows={{
                base: "auto auto",     // 2 rows on mobile
                lg: "auto"             // 1 row on desktop
            }}
            gridTemplateAreas={{
                base: `
                    "image content"
                    "price price"
                `,
                lg: "unset"
            }}
            gap={8} 
            p="4"
        >
            <Image
                src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
                alt={item.name}
                width={100}
                height={100}
                objectFit="cover"
                borderRadius="md"
            />
            <Stack gap={1} flex="1">
                <Text fontWeight="medium" fontSize="lg">
                    {item.name}
                </Text>
                <Text color="gray.500" fontSize="sm">
                    Color: {item.color}, Size: {item.size}
                </Text>
                <Link fontSize="sm" className="hover:text-red-400" width="fit-content">
                    Remove
                </Link>
            </Stack>
            <Stack gap={2} minW="100px" direction={{ base: "row", lg: "column" }}>
                <div>
                    {/* <NumberInputRoot size="sm" defaultValue={String(item.quantity)} variant="outline">
                        <NumberInputField />
                    </NumberInputRoot> */}
                    <Input type="number" defaultValue={String(item.quantity)} />
                </div>
                <Text fontWeight="medium" alignContent="center">${item.price}</Text>
            </Stack>
        </Grid>
    )
}