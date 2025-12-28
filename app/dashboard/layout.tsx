import Link from "next/link"
import { Heart, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/app/actions/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")

    if (!userId) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-muted/10">
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Heart className="h-6 w-6 text-red-500 fill-current" />
                        <span className="text-xl font-bold">Dashboard</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/dashboard/profile">
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/settings">
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </Link>
                        <form action={logoutUser}>
                            <Button variant="ghost" size="icon" type="submit">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </form>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto py-8 px-4">
                {children}
            </main>
        </div>
    )
}
