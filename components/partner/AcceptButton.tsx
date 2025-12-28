'use client'

import { acceptInvite } from "@/app/actions/partner"
import { Button } from "@/components/ui/button"

interface AcceptButtonProps {
    inviteId: string
}

export function AcceptButton({ inviteId }: AcceptButtonProps) {
    return (
        <form action={async () => {
            await acceptInvite(inviteId)
        }}>
            <Button size="sm" variant="default" type="submit">Accept</Button>
        </form>
    )
}
