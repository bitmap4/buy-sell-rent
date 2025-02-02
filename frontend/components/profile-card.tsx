import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@chakra-ui/react"
import {    VStack, Text } from "@chakra-ui/react"

type ProfileCardProps = {
    watchedValues: any
}

export function ProfileCard({ watchedValues }: ProfileCardProps) {
    const name = watchedValues.fname + " " + watchedValues.lname

    return (
        <Card.Root p="auto" variant="elevated" width="300px">
            <Card.Header alignItems="center">
                <Avatar className="w-32 h-32">
                    <AvatarImage src="https://splashbase.s3.amazonaws.com/unsplash/regular/tumblr_mnqy9v5X2t1qz4rgjo1_1280.jpg" alt={name} />
                    <AvatarFallback>AS</AvatarFallback>
                </Avatar>
            </Card.Header>
            <Card.Body>
                <VStack gap={4} align="center">
                    <Text fontSize="xl" fontWeight="bold">{name || "Your Name"}</Text>
                    <Text color="gray.500">{watchedValues.email || "N/A"}</Text>
                    <VStack align="left" width="full">
                        Age
                        <Text color="gray.500">{watchedValues.age || "N/A"}</Text>
                        Phone
                        <Text color="gray.500">{watchedValues.phone || "N/A"}</Text>
                    </VStack>
                </VStack>
            </Card.Body>
        </Card.Root>
    )
}