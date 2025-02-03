"use client"

import { useState, useEffect, useMemo } from "react"
import { SearchBar } from "./search-bar2";
import { Card, Image, Text } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Tags } from "@/components/tags";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product:any) => {
      const searchLower = searchQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      )
    })
  }, [products, searchQuery])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/itemS`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        
        setProducts(data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          tags: item.tags || [],
          image: item.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
        })))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load items')
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

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
      <Tags tags={tags} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
      {filteredProducts.map((product: any, i) => (
        <Card.Root 
          maxW="sm" 
          overflow="hidden" 
          key={i}
          onClick={() => router.push(`/item/${product.id}`)}
          cursor="pointer"
          _hover={{ transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          <Image
            src={product.image}
            alt="Green double couch with wooden legs"
          />
          <Card.Body gap="2">
            <Card.Title>{product.name}</Card.Title>
            <Card.Description>
              {product.description}
            </Card.Description>
            <Tags tags={product.tags} disabled />
          </Card.Body>
          <Card.Footer gap="2" className="flex justify-between">
            <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
              ${product.price}
            </Text>
            {/* <Button>Buy now</Button> */}
            <Button variant="outline">Add to cart</Button>
          </Card.Footer>
        </Card.Root>
      ))}
    </div>
  </>);
}

const tags = [
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