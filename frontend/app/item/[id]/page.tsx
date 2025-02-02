"use client"

import { Card, Image, Text, Separator } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation";
import { parse } from "path";

export default function Page() {
  const { id }: {id: string} = useParams();
  const i = parseInt(id);
  console.log(i);

  return (<>
      <Card.Root maxW="sm" overflow="hidden" key={i}>
        <Image
          src={products[i].image}
          alt="Green double couch with wooden legs"
        />
        <Card.Body gap="2">
          <Card.Title>{products[i].name}</Card.Title>
          <Card.Description>
            {products[i].description}
          </Card.Description>
        </Card.Body>
        <Card.Footer gap="2" className="flex justify-between">
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            ${products[i].price}
          </Text>
          {/* <Button>Buy now</Button> */}
          <Button variant="outline">Add to cart</Button>
        </Card.Footer>
      </Card.Root>
  </>);
}

const products = [
  {
    name: "Living room Sofa",
    description:
      "This sofa is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Modern Chair",
    description:
      "This chair is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Wooden Table",
    description:
      "This table is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Modern Lamp",
    description:
      "This lamp is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Modern Lamp",
    description:
      "This lamp is perfect for modern tropical spaces, baroque inspired spaces.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  }
];