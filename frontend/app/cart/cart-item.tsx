"use client"

import { Flex, Link, Image, Stack, Text, Grid, Separator } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"

interface CartItemProps {
    item: {
        id: string
        name: string
        price: number
        quantity: number
        image?: string
    }
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
    return (
        <Grid templateColumns={{ base: "100px 1fr", lg: "100px 1fr 100px" }} gap={8} p="4">
            <Image
                src={item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"}
                alt={item.name}
                width={100}
                height={100}
                objectFit="cover"
                borderRadius="md"
            />
            <Stack gap={1} flex="1">
                <Text fontWeight="medium" fontSize="lg">{item.name}</Text>
                <Link onClick={onRemove} fontSize="sm" className="hover:text-red-400" width="fit-content">
                    Remove
                </Link>
            </Stack>
            <Stack gap={2} minW="100px" direction={{ base: "row", lg: "column" }}>
                <Input 
                    type="number" 
                    value={item.quantity}
                    min={1}
                    onChange={(e) => onUpdateQuantity(parseInt(e.target.value))}
                />
                <Text fontWeight="medium">${item.price}</Text>
            </Stack>
        </Grid>
    )
}