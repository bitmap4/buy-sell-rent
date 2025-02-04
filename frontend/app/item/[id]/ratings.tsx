"use client"

import { useState, useEffect } from "react"
import { Stack, Text, Flex, Box } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"

interface Rating {
  rating: number
  reviewer: {
    firstName: string
    lastName: string
  }
  createdAt: string
  comment?: string
}

interface RatingsProps {
  sellerId: string
}

export function Ratings({ sellerId }: RatingsProps) {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [avgRating, setAvgRating] = useState<number>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchRatings = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?userId=${sellerId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      console.log(data)
      if (!response.ok) throw new Error(data.error)

      const reviews = data.user.sellerReviews || []
      setRatings(reviews)
      
      const avg = reviews.length 
        ? reviews.reduce((sum: number, review: Rating) => sum + review.rating, 0) / reviews.length
        : undefined
      setAvgRating(avg)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ratings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitRating = async () => {
    if (selectedRating < 1) return
    setSubmitting(true)
    setError("")

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${sellerId}/rate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            rating: selectedRating,
            comment
          })
        }
      )

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setSelectedRating(0)
      setComment("")
      fetchRatings()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit rating')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    fetchRatings()
  }, [sellerId])

  return (
    <Stack gap={6}>
      <Flex align="center" gap={4}>
        <Text fontSize="lg" fontWeight="medium">Seller Rating</Text>
        {avgRating && (
          <Flex align="center" gap={1}>
            <StarFilledIcon className="text-yellow-400" />
            <Text>{avgRating.toFixed(1)}</Text>
            <Text color="gray.500">({ratings.length})</Text>
          </Flex>
        )}
      </Flex>

      {error && <Text color="red.500">{error}</Text>}

      <Box>
        <Text mb={2}>Rate this seller:</Text>
        <Flex gap={2} mb={4}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className="hover:scale-110 transition-transform"
            >
              {rating <= selectedRating ? (
                <StarFilledIcon className="w-6 h-6 text-yellow-400" />
              ) : (
                <StarIcon className="w-6 h-6 text-gray-400" />
              )}
            </button>
          ))}
        </Flex>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment (optional)"
          className="mb-4"
        />
        <Button 
          onClick={handleSubmitRating}
          disabled={selectedRating < 1 || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Rating'}
        </Button>
      </Box>

      <Stack gap={4}>
        {ratings.map((rating, i) => {
            console.log(rating)
            return (
          <Box key={i} p={4} borderWidth={1} borderRadius="md">
            <Flex justify="space-between" mb={2}>
              <Text fontWeight="medium">
                {rating.reviewer.firstName} {rating.reviewer.lastName}
              </Text>
              <Flex align="center" gap={1}>
                <StarFilledIcon className="text-yellow-400" />
                <Text>{rating.rating}</Text>
              </Flex>
            </Flex>
            {rating.comment && (
              <Text color="gray.600">{rating.comment}</Text>
            )}
            <Text fontSize="sm" color="gray.500" mt={2}>
              {new Date(rating.createdAt).toLocaleDateString()}
            </Text>
          </Box>
        )})}
      </Stack>
    </Stack>
  )
}