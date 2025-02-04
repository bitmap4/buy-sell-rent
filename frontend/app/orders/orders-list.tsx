"use client"

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface OrdersListProps {
    type: string
}

export function OrdersList({ type }: OrdersListProps) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    window.location.href = '/login'
                    return
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?type=${type}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )

                const data = await response.json()
                if (!response.ok) throw new Error(data.error)
                
                setOrders(data.orders)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load orders')
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [type])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <Table>
            <TableCaption>Your order history</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>{type === 'sold' ? 'Buyer' : 'Seller'}</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order: any) => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                            {order.items.map((item: any) => 
                                `${item.item.name} (${item.quantity})`
                            ).join(", ")}
                        </TableCell>
                        <TableCell>
                            {type === 'sold' 
                                ? `${order.buyer.firstName} ${order.buyer.lastName}`
                                : `${order.seller.firstName} ${order.seller.lastName}`}
                        </TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell className="text-right">₹{order.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}