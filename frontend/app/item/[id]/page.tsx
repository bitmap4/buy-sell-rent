"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Text, Stack, Flex } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Tags } from "@/components/tags"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Ratings } from "./ratings"

export default function Page() {
  const { id } = useParams()
  const router = useRouter()
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [addingToCart, setAddingToCart] = useState(false)
  const [cartError, setCartError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/items/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        const data = await response.json()
        if (data.item.images.length === 0) {
          data.item.images = ['https://placehold.co/600x400', 'https://placehold.co/600x300', 'https://placehold.co/500x300']
        }
        if (!response.ok) throw new Error(data.error)

        // get seller data
        const sellerResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?userId=${data.item.sellerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const sellerData = await sellerResponse.json()
        if (!sellerResponse.ok) throw new Error(sellerData.error)

        data.item.seller = sellerData.user
        
        setItem(data.item)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load item')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  const handleAddToCart = async () => {
    setAddingToCart(true)
    setCartError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemId: id,
          quantity: 1
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      router.push('/cart')
    } catch (err) {
      setCartError(err instanceof Error ? err.message : 'Failed to add item to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!item) return <div>Item not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Carousel className="w-full md:w-1/2 scale-90">
          <CarouselContent>
            {item.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <img
                        src={image || 'https://placehold.co/600x400'}
                        alt={`${item.name} - image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
          
        <Stack gap={6} className="flex-1">
          <div>
            <Text className="text-3xl font-bold mb-2">{item.name}</Text>
            <Text className="text-2xl font-medium text-gray-500">₹{item.price}</Text>
          </div>

          <Text className="text-gray-400">{item.description}</Text>

          <div>
            <Text>{item.seller.firstName + ' ' + item.seller.lastName}</Text>
            <Text>{item.seller.email}</Text>
          </div>
          
          <div>
            <Tags tags={item.tags || ["test", "test2"]} disabled />
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="w-full"
          >
            {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </Button>

          {cartError && (
            <Text className="text-red-500 text-sm">{cartError}</Text>
          )}
        </Stack>
      </Flex>
      <Ratings sellerId={item.sellerId} />
    </div>
  )
}