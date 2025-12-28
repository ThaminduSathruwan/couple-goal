'use client'

import { loginUser } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { useActionState } from "react"

const initialState = {
    error: '',
}

export default function LoginPage() {
    const [state, formAction] = useActionState(loginUser, initialState)

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4 pt-20">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>
                            Login to continue tracking your goals.
                        </CardDescription>
                    </CardHeader>
                    <form action={formAction}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium">Password</label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            {state?.error && (
                                <p className="text-sm text-red-500">{state.error}</p>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full">
                                Log In
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-primary hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
