'use client'

import { unlinkPartner } from "@/app/actions/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>

            <Card className="border-red-200 dark:border-red-900/50">
                <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                    <CardDescription>
                        Actions here are irreversible or have significant side effects.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-sm">Unlink Partner</h4>
                            <p className="text-sm text-muted-foreground">
                                Disconnect from your current partner. Joint goals will be deleted.
                            </p>
                        </div>
                        <form action={async () => {
                            if (confirm("Are you sure? This will delete all shared goals.")) {
                                await unlinkPartner()
                            }
                        }}>
                            <Button variant="destructive" size="sm" type="submit">Unlink</Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
