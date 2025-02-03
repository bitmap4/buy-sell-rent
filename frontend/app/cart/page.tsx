"use client"

import { useState, useEffect } from "react"
import { Box, Container, Flex, Heading, Link, Separator, Stack } from "@chakra-ui/react"
import { CartItem } from "./cart-item"
import { OrderSummary } from "./order-summary"

export default function CartPage() {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                window.location.href = '/login'
                return
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)
            
            setCartItems(data.cart)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load cart')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleRemoveItem = async (itemId: string) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await fetch(`${process.env.NODE_PUBLIC_BACKEND_URL}/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error)
            }

            fetchCart() // Refresh cart
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove item')
        }
    }

    const handleUpdateQuantity = async (itemId: string, quantity: number) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await fetch(`${process.env.NODE_PUBLIC_BACKEND_URL}/api/cart`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId, quantity })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error)
            }

            fetchCart() // Refresh cart
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update quantity')
        }
    }

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await fetch(`${process.env.NODE_PUBLIC_BACKEND_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error)

            // Redirect to order confirmation page with OTP
            window.location.href = `/orders/${data.order.id}?otp=${data.otp}`
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to place order')
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <Container py={8} maxW={{ base: "100%", lg: "container.lg" }}>
            <Flex justify="space-between" align="center" mb={8}>
                <Heading textStyle="2xl" fontWeight="bold">
                    Shopping Cart ({cartItems.length} items)
                </Heading>
                <Link href="/home" color="blue.500" fontSize="sm">
                    Continue shopping →
                </Link>
            </Flex>

            <Flex gap={8} direction={{ base: "column", lg: "row" }}>
                <Stack gap={6} flex="1" minW={{ lg: "480px" }} separator={<Separator />}>
                    {cartItems.map((item:any) => (
                        <CartItem 
                            key={item.item.id} 
                            item={{
                                id: item.item.id,
                                name: item.item.name,
                                price: item.item.price,
                                quantity: item.quantity,
                                image: item.item.image
                            }}
                            onRemove={() => handleRemoveItem(item.item.id)}
                            onUpdateQuantity={(qty) => handleUpdateQuantity(item.item.id, qty)}
                        />
                    ))}
                </Stack>
                <Box w={{ base: "full", lg: "400px" }} minW={{ lg: "100px" }}>
                    <OrderSummary 
                        items={cartItems}
                        onCheckout={handleCheckout}
                    />
                </Box>
            </Flex>
        </Container>
    )
}