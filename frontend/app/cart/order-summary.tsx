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
            price: number,
            _id: string,
            name: string,
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
            {/* Item breakdown */}
            <Stack gap={3}>
                {items.map((item) => (
                    <Flex key={item.item._id} justify="space-between" fontSize="sm">
                        <Stack gap={0} flex={1}>
                            <Text fontWeight="medium">{item.item.name}</Text>
                            <Text color="gray.600">
                                {item.quantity} × ₹{item.item.price.toFixed(2)}
                            </Text>
                        </Stack>
                        <Text fontWeight="medium">
                            ₹{(item.item.price * item.quantity).toFixed(2)}
                        </Text>
                    </Flex>
                ))}
            </Stack>

            <Separator borderWidth="0.5px" />

            {/* Total */}
            <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                <Text>Total</Text>
                <Text>₹{subtotal.toFixed(2)}</Text>
            </Flex>

            <Button size="lg" onClick={onCheckout}>
                Checkout
            </Button>
        </Stack>
    )
}