"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

export default function Page() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        tags: [] as string[]
    })
    const [images, setImages] = useState<File[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setImages(prev => [...prev, ...files])
        
        // Create preview URLs
        const urls = files.map(file => URL.createObjectURL(file))
        setImageUrls(prev => [...prev, ...urls])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            // Create FormData for multipart/form-data
            const formDataToSend = new FormData()
            formDataToSend.append('name', formData.name)
            formDataToSend.append('price', formData.price)
            formDataToSend.append('description', formData.description)
            formData.tags.forEach(tag => formDataToSend.append('tags[]', tag))
            images.forEach(image => formDataToSend.append('images', image))

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/items`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error)
            }

            router.push('/home')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create item')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Listing</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <Text className="text-red-500">{error}</Text>}
                        
                        <div className="space-y-2">
                            <Text>Images</Text>
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                            {imageUrls.length > 0 && (
                                <Carousel className="w-full scale-90">
                                    <CarouselContent>
                                        {imageUrls.map((url, index) => (
                                            <CarouselItem key={index}>
                                                <Card>
                                                    <CardContent className="flex aspect-video items-center justify-center p-0">
                                                        <img
                                                            src={url}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Text>Name</Text>
                            <Input
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Text>Price</Text>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Text>Description</Text>
                            <Textarea
                                value={formData.description}
                                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Text>Tags</Text>
                            <Tags
                                tags={["furniture", "decor", "living room", "kitchen", "bedroom"]}
                                selectedTags={formData.tags}
                                onTagSelect={(tag) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        tags: prev.tags.includes(tag)
                                            ? prev.tags.filter(t => t !== tag)
                                            : [...prev.tags, tag]
                                    }))
                                }}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? 'Creating...' : 'Create Listing'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}