"use client"

import { Stack, Text, Grid, Image, Link } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { createListCollection } from "@chakra-ui/react"

interface CartItemProps {
    item: {
        id: string
        name: string
        price: number
        quantity: number
        maxQuantity: number
        images?: [string]
    }
    onRemove: () => void
    onUpdateQuantity: (quantity: number) => void
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
    const quantities = createListCollection({
        items: Array.from({ length: item.maxQuantity }, (_, i) => ({
            value: i + 1,
            label: i + 1
        })),
        itemToString: (item) => String(item.label),
        itemToValue: (item) => String(item.value),
    })

    return (
        <Grid templateColumns={{ base: "100px 1fr", lg: "100px 1fr 100px" }} gap={8} p="4">
            <Image
                src={(item.images || ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc"])[0]}
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
                <SelectRoot 
                    collection={quantities}
                    defaultValue={[String(item.quantity)]}
                    onValueChange={(item: any) => {
                        console.log(item.value)
                        return onUpdateQuantity(parseInt(item.value[0]))}}
                    size="sm"
                    width="64px"
                >
                    {/* <SelectLabel>Quantity</SelectLabel> */}
                    <SelectTrigger className="border rounded-md px-2">
                        <SelectValueText />
                    </SelectTrigger>
                    <SelectContent>
                        {quantities.items.map((quantityOption) => (
                            <SelectItem
                                key={quantityOption.value}
                                item={quantityOption}
                                px={2}
                            >
                                {quantityOption.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                <Text fontWeight="medium">₹{item.price}</Text>
            </Stack>
        </Grid>
    )
}