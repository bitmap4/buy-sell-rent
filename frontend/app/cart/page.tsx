"use client"

import { Box, Container, Flex, Heading, Link, Separator, Stack } from "@chakra-ui/react"
import { CartItem } from "./cart-item"
import { OrderSummary } from "./order-summary"

const cartItems = [
    {
        id: 1,
        name: "Ferragamo bag",
        color: "Tan",
        size: "L",
        price: 39.99,
        quantity: 3,
        image: "",
        hasGiftWrapping: true,
    },
    {
        id: 2,
        name: "Bamboo Tan",
        color: "Red",
        size: "M",
        price: 39.99,
        quantity: 1,
        image: "",
        hasGiftWrapping: false,
    },
    {
        id: 3,
        name: "Yeezy Sneakers",
        color: "White",
        size: "8",
        price: 39.99,
        quantity: 1,
        image: "",
        hasGiftWrapping: true,
    },
]

export default function CartPage() {
    return (
        <Container py={8} maxW={{ base: "100%", lg: "container.lg" }}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading textStyle="2xl" fontWeight="bold">Shopping Cart ({cartItems.length} items)</Heading>
                <Link href="/shop" color="blue.500" fontSize="sm">
                    Continue shopping →
                </Link>
            </Flex>

            <Flex gap={8} direction={{ base: "column", lg: "row" }}>
                <Stack 
                    gap={6} 
                    flex="1"
                    minW={{ lg: "480px" }}
                    separator={<Separator />}
                >
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </Stack>
                <Box 
                    w={{ base: "full", lg: "400px" }}
                    minW={{ lg: "100px" }}
                    flexShrink={0}
                    position={{ base: "sticky", lg: "static" }}
                    bottom={{ base: 8, lg: "auto" }}
                    boxShadow={{ base: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)", lg: "none" }}
                >
                    <OrderSummary />
                </Box>
            </Flex>
        </Container>
    )
}

