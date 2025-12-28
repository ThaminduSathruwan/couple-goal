'use client'

import { updateProfile } from "@/app/actions/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"

const initialState = {
    success: '',
    error: '',
}

export function ProfileForm({ user }: { user: any }) {
    const [state, formAction] = useActionState(updateProfile, initialState)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" name="name" defaultValue={user.name || ''} required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" name="email" defaultValue={user.email || ''} required />
                    </div>
                    {state.error && <p className="text-sm text-red-500">{state.error}</p>}
                    {state.success && <p className="text-sm text-green-500">{state.success}</p>}
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
