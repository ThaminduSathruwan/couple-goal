import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InvitePartnerForm } from "@/components/partner/InvitePartnerForm"
import { AcceptButton } from "@/components/partner/AcceptButton"

async function getData(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            sentInvites: true,
            receivedInvites: {
                where: { status: "PENDING" },
                include: { sender: true }
            }
        }
    })

    // Also check for invites sent to this email even if receiverId wasn't set initially (if they registered after invite)
    const emailInvites = await prisma.invite.findMany({
        where: {
            email: user?.email,
            status: 'PENDING',
            // Exclude if already in receivedInvites (redundancy check, though findMany is cheap here)
            NOT: { receiverId: userId }
        },
        include: { sender: true }
    })

    return { user, emailInvites }
}

export default async function PartnerPage() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    if (!userId) return null

    const { user, emailInvites } = await getData(userId)
    const receivedInvites = [...(user?.receivedInvites || []), ...emailInvites]

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Connect with your Partner</h1>
                <p className="text-muted-foreground">Invite your significant other to start tracking goals together.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Send Invite */}
                <InvitePartnerForm />

                {/* Pending Invites */}
                <Card>
                    <CardHeader>
                        <CardTitle>Received Invites</CardTitle>
                        <CardDescription>Accept requests to link accounts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {receivedInvites.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No pending invites.</p>
                        ) : (
                            receivedInvites.map((invite) => (
                                <div key={invite.id} className="flex items-center justify-between border p-3 rounded-lg">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{invite.sender.name || invite.sender.email}</span>
                                        <span className="text-xs text-muted-foreground">wants to connect</span>
                                    </div>
                                    <AcceptButton inviteId={invite.id} />
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Sent Invites Status */}
            {user?.sentInvites && user.sentInvites.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Sent Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {user.sentInvites.map(invite => (
                                <li key={invite.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                                    <span>{invite.email}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${invite.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                                        invite.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {invite.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
