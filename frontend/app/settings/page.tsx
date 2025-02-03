"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@chakra-ui/react"
import { Grid, GridItem, VStack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { FormInput } from "./form-input"
import { ProfileCard } from "@/components/profile-card"
import { useState, useEffect } from "react"

const formSchema = z.object({
  fname: z.string().min(2),
  lname: z.string().min(2),
  email: z.string().email(),
  age: z.string(),
  phone: z.number().min(1000000000).max(9999999999)
})

export default function SettingsPage() {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     fname: "Abhyudit",
  //     lname: "Singh",
  //     email: "abhyudit.singh@research.iiit.ac.in",
  //     age: "18",
  //     phone: "1337001337"
  //   },
  // })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      age: "",
      phone: 0
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          window.location.href = '/login'
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()

        if (!response.ok) throw new Error(data.error)

        form.reset({
          fname: data.user.firstName,
          lname: data.user.lastName,
          email: data.user.email,
          age: data.user.age.toString(),
          phone: data.user.contactNumber
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user data')
      }
    }

    fetchUserData()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/api/auth/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: values.fname,
          lastName: values.lname,
          age: parseInt(values.age),
          contactNumber: values.phone
        })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const watchedValues = form.watch()

  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8} p={{ base: "4", sm: "16"}} maxW="container.xl" mx="auto">
      <GridItem>
        <Text fontSize="2xl" fontWeight="bold">Edit Profile</Text>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <VStack gap={6} align="stretch">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput form={form} name="pfp" label="Profile Picture" type="file" />
                <Button type="submit" className="w-full mt-6 max-w-[150px]">Delete</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput form={form} name="fname" label="First Name" type="text" />
                <FormInput form={form} name="lname" label="Last Name" type="text" />
              </div>
              <FormInput form={form} name="email" label="Email" type="email" disabled />
              <div className="grid grid-cols-2 gap-4">
                <FormInput form={form} name="age" label="Age" type="number" />
                <FormInput form={form} name="phone" label="Phone" type="text" />
              </div>
              <Button
                type="submit"
                className="w-full mt-6 max-w-[150px]"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </VStack>
      </GridItem>

      <GridItem position="sticky" top={4}>
        <Text fontSize="md" fontWeight="bold" marginBottom="0.5rem">Preview</Text>
        <ProfileCard watchedValues={watchedValues} />
      </GridItem>
    </Grid>
  )
}