"use client"

import { useState, useEffect, useMemo } from "react"
import { SearchBar } from "./search-bar2";
import { Card, Image, Link, Text } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Tags } from "@/components/tags";
import { useRouter } from "next/navigation";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { createListCollection } from "@chakra-ui/react"

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [cartError, setCartError] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({})

  const filteredProducts = useMemo(() => {
    return products.filter((product:any) => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.some(tag => product.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [products, searchQuery, selectedTags])

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/items`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      
      setProducts(data.items.map((item: any) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        maxQuantity: item.quantity,
        tags: item.tags || ["test"],
        images: item.images,
        sellerId: item.sellerId
      })))
      console.log(data.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      // Create map of itemId -> quantity
      const cartMap = data.cart.reduce((acc: any, item: any) => {
        acc[item.item._id] = item.quantity
        return acc
      }, {})
      setCartItems(cartMap)
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    }
  }

  useEffect(() => {
    fetchItems()
    fetchCart()
  }, [])

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation()
    setAddingToCart(productId)
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
          itemId: productId,
          quantity: 1
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      await fetchCart()
    } catch (err) {
      setCartError(err instanceof Error ? err.message : 'Failed to add item to cart')
    } finally {
      setAddingToCart(null)
    }
  }

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: productId, quantity })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      await fetchCart()
    } catch (err) {
      setCartError(err instanceof Error ? err.message : 'Failed to update quantity')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (<>
    <div className="flex w-full justify-center px-6 md:px-10 pt-6 md:pt-10">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
    </div>
    <div className="px-6 md:px-10">
      <Text textStyle="xs" letterSpacing="tight" color="gray.emphasized" mt="1">
        Tags
      </Text>
      <Tags 
        tags={tags} 
        selectedTags={selectedTags}
        onTagSelect={(tag) => {
          setSelectedTags(prev => 
            prev.includes(tag) 
              ? prev.filter(t => t !== tag)
              : [...prev, tag]
          )
        }}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
      {filteredProducts.map((product: any, i) => (
        <Link href={`/item/${product.id}`} key={i}>
          <Card.Root 
            maxW="sm" 
            overflow="hidden"
            cursor="pointer"
            _hover={{ transform: 'scale(1.02)' }}
            transition="all 0.2s"
            width={400}
          >
            <Image
              src={product.images[0] || 'https://placehold.co/600x400'}
              width="sm"
              aspectRatio={ 3/2 }
              alt={product.name}
            />
            <Card.Body gap="2" height="200">
              <Card.Title>{product.name}</Card.Title>
              <Card.Description>
                {product.description}
              </Card.Description>
              <Tags tags={product.tags} disabled />
            </Card.Body>
            <Card.Footer gap="2" className="flex justify-between">
              <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                ₹{product.price}
              </Text>
              <div onClick={(e) => e.preventDefault()}>
                {cartItems[product.id] ? (
                  <SelectRoot 
                    collection={createListCollection({
                      items: Array.from({ length: product.maxQuantity }, (_, i) => ({
                        value: i + 1,
                        label: i + 1
                      })),
                      itemToString: (item) => String(item.label),
                      itemToValue: (item) => String(item.value),
                    })}
                    value={[String(cartItems[product.id])]}
                    onValueChange={(item) => handleUpdateQuantity(product.id, parseInt(item.value[0]))}
                    size="sm"
                    width="64px"
                  >
                    <SelectTrigger className="border rounded-md px-2">
                      <SelectValueText />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: product.maxQuantity }, (_, i) => (
                        <SelectItem
                          key={i + 1}
                          item={{ value: i + 1, label: i + 1 }}
                          px={2}
                        >
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddToCart(e, product.id)
                    }}
                    disabled={addingToCart === product.id}
                  >
                    {addingToCart === product.id ? 'Adding...' : 'Add to cart'}
                  </Button>
                )}
              </div>
            </Card.Footer>
            {cartError && product.id === addingToCart && (
              <div className="text-red-500 text-sm mt-2">{cartError}</div>
            )}
          </Card.Root>
        </Link>
      ))}
    </div>
  </>);
}

const tags = [
  "test",
  "furniture",
  "home",
  "decor",
  "living room",
  "modern",
  "tropical",
  "baroque",
  "wooden",
  "lamp",
  "chair",
  "table",
  "sofa",
  "couch",
  "double",
  "green",
  "legs",
  "inspired",
  "spaces",
  "perfect"
];