"use client"

import { useState, useEffect } from "react"
import { Container, Stack, Card, Text, Heading } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { toaster } from "@/components/ui/toaster"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function DeliveryPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [otpValues, setOtpValues] = useState<{ [key: string]: string }>({})
  const [verifying, setVerifying] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?type=sold`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      
      setOrders(data.orders.filter((order: any) => order.status === 'pending'))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (orderId: string) => {
    setVerifying(orderId)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}/complete`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ otp: otpValues[orderId] })
        }
      )

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      toaster.create({
        description: "Delivery completed successfully",
        type: "success",
      })

      fetchOrders() // Refresh list
    } catch (err) {
      toaster.create({
        description: err instanceof Error ? err.message : 'Invalid OTP',
        type: "error",
      })
    } finally {
      setVerifying(null)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Container py={8}>
      <Stack gap={6}>
        <Heading size="lg">Pending Deliveries</Heading>
        {orders.length === 0 ? (
          <Text>No pending deliveries</Text>
        ) : (
          orders.map((order: any) => (
            <Card.Root key={order.id} p={6}>
              <Stack gap={4}>
                <Stack direction="row" justify="space-between">
                  <Text fontWeight="medium">Order #{order.id}</Text>
                  <Text fontWeight="medium">₹{order.total}</Text>
                </Stack>

                <Stack>
                  <Text>Buyer: {order.buyer.firstName} {order.buyer.lastName}</Text>
                  <Text>Items: {order.items.map((item: any) => 
                    `${item.item.name} (${item.quantity})`
                  ).join(", ")}</Text>
                </Stack>

                <Stack gap={4}>
                  <Text fontWeight="medium">Enter Delivery OTP</Text>
                  <InputOTP 
                    maxLength={6}
                    value={otpValues[order._id] || ""}
                    onChange={(value) => setOtpValues(prev => ({
                      ...prev,
                      [order._id]: value
                    }))}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  <Button 
                    onClick={() => handleVerifyOTP(order._id)}
                    // disabled={!otpValues[order.id] || otpValues[order.id].length !== 6 || verifying === order.id}
                  >
                    {verifying === order.id ? 'Verifying...' : 'Complete Delivery'}
                  </Button>
                </Stack>
              </Stack>
            </Card.Root>
          ))
        )}
      </Stack>
    </Container>
  )
}