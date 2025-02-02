"use client"

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// export function ProfileForm({
//     className,
//     ...props
// }: React.ComponentPropsWithoutRef<"div">) {
export function Profile(){
    const [editing, setEditing] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Profile</CardTitle>
                {/* <CardDescription>
                    Update your profile
                </CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-[50px_1fr] gap-2">
                        <div className="flex items-center">Name</div>
                        <Input
                            id="name"
                            type="text"
                            value="Abhyudit Singh"
                            required
                            {...(editing ? { readOnly: false } : { readOnly: true })}
                            className={editing ? "" : "border-none"}
                        />
                    </div>
                    <div className="grid grid-cols-[50px_1fr] gap-2">
                        <div className="flex items-center">Email</div>
                        <Input
                            id="email"
                            type="email"
                            value="abhyudit.singh@research.iiit.ac.in"
                            required
                            {...(editing ? { readOnly: false } : { readOnly: true })}
                            className={editing ? "" : "border-none"}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col gap-6">
                    <Button
                        type="button"
                        onClick={() => setEditing(!editing)}
                        className="w-full"
                    >
                        {editing ? "Save" : "Edit"}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}