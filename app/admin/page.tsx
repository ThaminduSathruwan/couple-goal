import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getAdminData(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (user?.role !== "ADMIN") {
        redirect("/dashboard")
    }

    const allUsers = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: { couple: true }
    })

    return { allUsers }
}

export default async function AdminPage() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    if (!userId) redirect("/login")

    const { allUsers } = await getAdminData(userId)

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>All Users ({allUsers.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/50">
                                    <tr>
                                        <th className="p-4 text-left font-medium">Name</th>
                                        <th className="p-4 text-left font-medium">Email</th>
                                        <th className="p-4 text-left font-medium">Joined</th>
                                        <th className="p-4 text-left font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((u: any) => (
                                        <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                            <td className="p-4">{u.name}</td>
                                            <td className="p-4">{u.email}</td>
                                            <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                {u.coupleId ? (
                                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-pink-500 text-white shadow hover:bg-pink-500/80">
                                                        In Couple
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                        Single
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
