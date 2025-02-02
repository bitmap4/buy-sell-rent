"use client"

import { SearchBar } from "./search-bar2";
import { Card, Image, Text } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Tags } from "@/components/tags";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (<>
    <div className="flex w-full justify-center px-6 md:px-10 pt-6 md:pt-10">
      <SearchBar />
    </div>
    <div className="px-6 md:px-10">
      <Text textStyle="xs" letterSpacing="tight" color="gray.emphasized" mt="1">
        Tags
      </Text>
      <Tags tags={tags} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10">
      {products.map((product, i) => (
        <Card.Root 
          maxW="sm" 
          overflow="hidden" 
          key={i}
          onClick={() => router.push(`/item/${product.id}`)}
          cursor="pointer"
          _hover={{ transform: 'scale(1.2)' }}
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

const products = [
  {
    id: 0,
    name: "Living room Sofa",
    description:
      "This sofa is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 450,
    tags: ["furniture", "home"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 1,
    name: "Modern Chair",
    description:
      "This chair is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 150,
    tags: ["furniture", "chair"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    name: "Wooden Table",
    description:
      "This table is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 250,
    tags: ["furniture", "table"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 3,
    name: "Modern Lamp",
    description:
      "This lamp is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 50,
    tags: ["light", "lamp"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 4,
    name: "Modern Lamp",
    description:
      "This lamp is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 50,
    tags: ["furniture", "lamp"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  }
];

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