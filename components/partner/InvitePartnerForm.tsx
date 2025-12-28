'use client'

import { sendInvite } from "@/app/actions/partner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart } from "lucide-react"
import { useActionState } from "react"

type FormState = {
    success: string;
    error: string;
};

const initialState: FormState = {
    success: '',
    error: '',
}

export function InvitePartnerForm() {
    const [state, formAction] = useActionState(sendInvite, initialState)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send Invite</CardTitle>
                <CardDescription>Enter your partner's email address.</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent>
                    <Input name="email" type="email" placeholder="partner@example.com" required />
                    {state?.error && <p className="text-sm text-red-500 mt-2">{state.error}</p>}
                    {state?.success && <p className="text-sm text-green-500 mt-2">{state.success}</p>}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        <Heart className="mr-2 h-4 w-4" /> Send Invite
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
