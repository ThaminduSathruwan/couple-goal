import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Heart } from "lucide-react"
import Link from "next/link"

/*
  This is a Server Component that fetches data directly.
*/
async function getDashboardData(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            goals: true,
            couple: {
                include: {
                    goals: true,
                    users: true,
                }
            }
        }
    })
    return user
}

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) return null // Handled by layout

    const user = await getDashboardData(userId)

    if (!user) return <p>User not found</p>

    const hasPartner = !!user.coupleId
    const partner = user.couple?.users.find(u => u.id !== user.id)

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Hi, {user.name} 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Here's what's happening with your goals.
                    </p>
                </div>
                <div className="flex gap-2">
                    {!hasPartner && (
                        <Link href="/dashboard/partner">
                            <Button variant="outline">
                                <Users className="mr-2 h-4 w-4" />
                                Connect Partner
                            </Button>
                        </Link>
                    )}
                    <Link href="/dashboard/goals/new">
                        <Button variant="default">
                            <Plus className="mr-2 h-4 w-4" />
                            New Goal
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Couple Goals Section */}
            {hasPartner && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-500 fill-current" />
                            Couple Goals
                        </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {user.couple?.goals.map((goal) => (
                            <Card key={goal.id} className="relative overflow-hidden border-pink-200 dark:border-pink-900/50">
                                <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                        {goal.description || "No description"}
                                    </p>
                                    {goal.targetDate && (
                                        <div className="flex items-center text-xs text-muted-foreground gap-1 mt-2">
                                            <span>📅 {new Date(goal.targetDate).toLocaleDateString()}</span>
                                            {new Date(goal.targetDate) < new Date(Date.now() + 86400000) && !goal.completed && (
                                                <span className="text-amber-500 font-bold ml-auto animate-pulse">⚠️ Upcoming!</span>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                        {user.couple?.goals.length === 0 && (
                            <Card className="border-dashed flex items-center justify-center p-8 text-muted-foreground">
                                <p>No couple goals yet. Create one!</p>
                            </Card>
                        )}
                    </div>
                </section>
            )}

            {/* Individual Goals Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">My Personal Goals</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {user.goals.map((goal) => (
                        <Card key={goal.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{goal.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                    {goal.description || "No description"}
                                </p>
                                {goal.targetDate && (
                                    <div className="flex items-center text-xs text-muted-foreground gap-1 mt-2">
                                        <span>📅 {new Date(goal.targetDate).toLocaleDateString()}</span>
                                        {new Date(goal.targetDate) < new Date(Date.now() + 86400000) && !goal.completed && (
                                            <span className="text-amber-500 font-bold ml-auto animate-pulse">⚠️ Upcoming!</span>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                    {user.goals.length === 0 && (
                        <Card className="border-dashed flex items-center justify-center p-8 text-muted-foreground">
                            <p>No personal goals yet.</p>
                        </Card>
                    )}
                </div>
            </section>
        </div>
    )
}
