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

export async function sendInvite(prevState: any, formData: FormData) {
    const userId = await getUserId()
    const email = formData.get("email") as string

    if (!email) return { error: "Email is required" }

    const sender = await prisma.user.findUnique({ where: { id: userId } })
    if (sender?.coupleId) return { error: "You are already in a couple" }
    if (sender?.email === email) return { error: "You cannot invite yourself" }

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({ where: { email } })

    // Check if invite exists
    const existingInvite = await prisma.invite.findFirst({
        where: {
            senderId: userId,
            email: email,
            status: "PENDING"
        }
    })

    if (existingInvite) return { error: "Invite already sent" }

    await prisma.invite.create({
        data: {
            senderId: userId,
            email: email,
            receiverId: receiver?.id, // nullable if user not registered yet
        }
    })

    revalidatePath("/dashboard/partner")
    return { success: "Invite sent!", error: "" }
}

export async function acceptInvite(inviteId: string) {
    const userId = await getUserId()

    const invite = await prisma.invite.findUnique({ where: { id: inviteId } })
    if (!invite) return { error: "Invite not found" }
    if (invite.receiverId !== userId && invite.email !== (await prisma.user.findUnique({ where: { id: userId } }))?.email) {
        return { error: "Not your invite" }
    }

    // Create Couple
    const couple = await prisma.couple.create({
        data: {
            users: {
                connect: [{ id: invite.senderId }, { id: userId }]
            }
        }
    })

    // Update users
    await prisma.user.update({ where: { id: invite.senderId }, data: { coupleId: couple.id } })
    await prisma.user.update({ where: { id: userId }, data: { coupleId: couple.id } })

    // Update invite
    await prisma.invite.update({ where: { id: inviteId }, data: { status: "ACCEPTED" } })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function createGoal(formData: FormData) {
    const userId = await getUserId()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as "INDIVIDUAL" | "JOINT"
    const targetDateStr = formData.get("targetDate") as string
    const targetDate = targetDateStr ? new Date(targetDateStr) : null

    if (!title) return { error: "Title is required" }

    const user = await prisma.user.findUnique({ where: { id: userId } })

    await prisma.goal.create({
        data: {
            title,
            description,
            type,
            targetDate,
            userId: type === "INDIVIDUAL" ? userId : undefined,
            coupleId: type === "JOINT" ? user?.coupleId : undefined,
        }
    })

    revalidatePath("/dashboard")
    return { success: true }
}
