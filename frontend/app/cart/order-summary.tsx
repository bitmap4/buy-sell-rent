"use client"

import {
    Separator,
    Stack,
    Text,
    Flex, // Import Flex from @chakra-ui/react
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

interface OrderSummaryProps {
    items: Array<{
        item: {
            price: number
        }
        quantity: number
    }>
    onCheckout: () => void
}

export function OrderSummary({ items, onCheckout }: OrderSummaryProps) {
    const subtotal = items.reduce((total, item) => 
        total + (item.item.price * item.quantity), 0)

    return (
        <Stack gap={4} p={6} borderWidth={1} borderRadius="md" background="Background">
            <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                <Text>Total</Text>
                <Text>${subtotal.toFixed(2)}</Text>
            </Flex>
            <Button size="lg" onClick={onCheckout}>
                Checkout
            </Button>
        </Stack>
    )
}