"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Profile() {
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        firstName: "",
        lastName: ""
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    window.location.href = '/login'
                    return
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http:localhost:3000"}/api/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                
                if (!response.ok) throw new Error(data.error)

                setUserData({
                    name: `${data.user.firstName} ${data.user.lastName}`,
                    email: data.user.email,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName
                })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load user data')
            }
        }

        fetchUserData()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                window.location.href = '/login'
                return
            }

            const [firstName, lastName] = userData.name.split(' ')

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http:localhost:3000"}/api/auth/me`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error)

            setEditing(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Profile</CardTitle>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-[50px_1fr] gap-2">
                        <div className="flex items-center">Name</div>
                        <Input
                            id="name"
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            required
                            readOnly={!editing}
                            className={editing ? "" : "border-none"}
                        />
                    </div>
                    <div className="grid grid-cols-[50px_1fr] gap-2">
                        <div className="flex items-center">Email</div>
                        <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            required
                            readOnly
                            className="border-none"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col gap-6 w-full">
                    <Button
                        type="button"
                        onClick={() => editing ? handleSubmit() : setEditing(true)}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Saving..." : editing ? "Save" : "Edit"}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}