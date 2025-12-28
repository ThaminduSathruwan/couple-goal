'use client'

import { createGoal } from "@/app/actions/partner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function NewGoalPage() {
    const router = useRouter() // For client-side navigation if needed, though server action redirects.

    return (
        <div className="max-w-xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Goal</CardTitle>
                    <CardDescription>Set a target for yourself or as a couple.</CardDescription>
                </CardHeader>
                <form action={async (formData) => {
                    await createGoal(formData)
                    router.push('/dashboard') // Optional explicit redirect
                }}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">Goal Title</label>
                            <Input id="title" name="title" placeholder="e.g. Save for Vacation" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
                            <Input id="description" name="description" placeholder="Details about the goal..." />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="targetDate" className="text-sm font-medium">Target Date (Optional)</label>
                            <Input id="targetDate" name="targetDate" type="date" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Goal Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-muted/50 w-full">
                                    <input type="radio" name="type" value="INDIVIDUAL" defaultChecked />
                                    <span>Individual</span>
                                </label>
                                <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer hover:bg-muted/50 w-full">
                                    <input type="radio" name="type" value="JOINT" />
                                    <span>Couple (Joint)</span>
                                </label>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" variant="default">Create Goal</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
