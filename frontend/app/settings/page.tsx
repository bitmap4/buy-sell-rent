"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@chakra-ui/react"
import { Grid, GridItem, VStack, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ProfileCard } from "@/components/profile-card"

const formSchema = z.object({
  fname: z.string().min(2),
  lname: z.string().min(2),
  email: z.string().email(),
  age: z.string(),
  phone: z.string()
})

export default function SettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "Abhyudit",
      lname: "Singh",
      email: "abhyudit.singh@research.iiit.ac.in",
      age: "18",
      phone: "1337001337"
    },
  })

  const watchedValues = form.watch()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8} p={{ base: "4", sm: "16"}} maxW="container.xl" mx="auto">
      <GridItem>
        <Text fontSize="2xl" fontWeight="bold">Edit Profile</Text>
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
              <Button type="submit" className="w-full mt-6 max-w-[150px]">Save Changes</Button>
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

type FormInputProps = {
  form: any,
  name: string,
  label: string,
  type: string,
  disabled?: boolean
}
const FormInput = ({ form, name, label, type, disabled }: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} className="max-w-[300px]" disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}