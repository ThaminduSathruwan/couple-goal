import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Heart, Shield, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32 flex flex-col items-center justify-center text-center">
          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary/10 text-secondary">
                <Sparkles className="mr-2 h-4 w-4" />
                The #1 Goal Setting App for Couples
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-purple-200 dark:to-white">
                Grow Together, <br /> Achieve More.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Set individual targets and shared dreams. Sync your life with your partner and celebrate every milestone together.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" variant="premium" className="h-12 px-8 text-base">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[600px] bg-purple-200/30 rounded-full blur-3xl opacity-50 dark:bg-purple-900/20" />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl border bg-card/50 backdrop-blur-sm h-full">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Couple Goals</h3>
                <p className="text-muted-foreground">
                  Create shared goals visible to both. Plan vacations, savings, or habits together.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl border bg-card/50 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Individual Growth</h3>
                <p className="text-muted-foreground">
                  Maintain personal aspirations. Your partner supports you, but you own your journey.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl border bg-card/50 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-green-500/10 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-muted-foreground">
                  Mark milestones, see progress bars, and accurate tracking of your joint success.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t bg-muted/10">
        <div className="container mx-auto flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} <Link href="https://github.com/ThaminduSathruwan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">Thamindu Sathruwan</Link>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
