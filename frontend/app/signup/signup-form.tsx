"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        age: '',
        contactNumber: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'include', // Add this for cookies
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName || 'John',
                    lastName: formData.lastName || 'Doe',
                    age: formData.age || 25,
                    contactNumber: formData.contactNumber || 1234567890,
                }),
            });

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            // Handle successful registration
            // Store token in localStorage
            localStorage.setItem('token', data.token)
            // Redirect to dashboard or home
            window.location.href = '/home'

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Sign up in less than 2 minutes. Only IIIT emails are allowed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-500 text-sm mb-4">{error}</div>
                        )}
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    placeholder="25"
                                    required
                                    min="13"
                                    max="120"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="contactNumber">Contact Number</Label>
                                <Input
                                    id="contactNumber"
                                    type="tel"
                                    placeholder="1234567890"
                                    required
                                    pattern="[0-9]{10}"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input 
                                    id="confirmPassword" 
                                    type="password" 
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Signup'}
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with IIIT
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="underline underline-offset-4">
                                Log in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
