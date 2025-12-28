'use server'

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getUserId() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    if (!userId) redirect("/login")
    return userId
}

export async function updateProfile(prevState: any, formData: FormData) {
    const userId = await getUserId()
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (!name || !email) {
        return { error: "Name and Email are required", success: "" }
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { name, email }
        })
        revalidatePath("/dashboard/profile")
        return { success: "Profile updated successfully!", error: "" }
    } catch (error) {
        return { error: "Failed to update profile", success: "" }
    }
}

export async function unlinkPartner() {
    const userId = await getUserId()
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { couple: true }
    })

    if (!user?.coupleId) {
        return { error: "No partner to unlink" }
    }

    // Convert couple goals to individual goals for the owner?
    // For MVP, we'll just delete the couple record, which might fail if we don't handle goals first
    // Let's delete couple goals for simplicity or unlink them.
    // Actually, let's just delete the couple relationship.

    const coupleId = user.coupleId

    // 1. Disconnect users
    await prisma.user.updateMany({
        where: { coupleId },
        data: { coupleId: null }
    })

    // 2. Delete couple goals (optional, but cleaner for MVP to avoid orphans if they rely on coupleId)
    await prisma.goal.deleteMany({
        where: { coupleId }
    })

    // 3. Delete invites related to this couple's formation if any were pending/accepted? 
    // Already accepted ones are fine.

    // 4. Delete the couple record
    await prisma.couple.delete({
        where: { id: coupleId }
    })

    revalidatePath("/dashboard")
    return { success: "Partner unlinked successfully" }
}
