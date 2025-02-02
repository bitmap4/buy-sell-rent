"use client"

import {
    Separator,
    Stack,
    Text,
    Flex, // Import Flex from @chakra-ui/react
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

export function OrderSummary() {
    const subtotal = 597.0
    // const coupon = 40.0
    // const delivery = 24.65
    // const total = subtotal - coupon + delivery

    return (
        <Stack gap={4} p={6} borderWidth={1} borderRadius="md" background="Background">
            {/* <Stack gap={3}>
                <Flex justify="space-between">
                    <Text color="gray.500">Subtotal</Text>
                    <Text fontWeight="medium">${subtotal.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                    <Text color="gray.500">Coupon</Text>
                    <Text fontWeight="medium">-${coupon.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                    <Text color="gray.500">Delivery</Text>
                    <Text fontWeight="medium">${delivery.toFixed(2)}</Text>
                </Flex>
            </Stack> 
            <Separator /> */}
            <Flex justify="space-between" fontSize="lg" fontWeight="bold">
                <Text>Total</Text>
                <Text>${subtotal.toFixed(2)}</Text>
            </Flex>
            <Button size="lg">
                Checkout
            </Button>
        </Stack>
    )
}

