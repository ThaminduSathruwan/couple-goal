import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProfileForm } from "./ProfileForm"

async function getUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    if (!userId) redirect("/login")

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    return user
}

export default async function ProfilePage() {
    const user = await getUser()
    if (!user) redirect("/login")

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <ProfileForm user={user} />
        </div>
    )
}
