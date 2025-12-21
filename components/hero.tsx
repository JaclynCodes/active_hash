import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gestalt/20 via-dissonance/10 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[600px] rounded-full bg-gradient-to-l from-creep/15 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-gestalt" />
            <span className="text-muted-foreground">Dual-Lens Architecture v6.5</span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Map the Complexity,{" "}
            <span className="bg-gradient-to-r from-gestalt via-dissonance to-creep bg-clip-text text-transparent">
              Master the System
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Atlas uses dual-lens architecture to visualize complex systems through the Actor Loop and Chemistry Flow,
            revealing hidden patterns and connections.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 bg-gestalt hover:bg-gestalt/90">
              Explore Atlas
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              <Sparkles className="h-4 w-4" />
              View Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">Join thousands visualizing systems with clarity.</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 p-8">
              <div className="grid h-full grid-cols-4 gap-4">
                <div className="col-span-1 rounded-lg bg-background/50 p-4">
                  <div className="mb-4 h-8 w-24 rounded bg-muted" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-6 rounded bg-muted" />
                    ))}
                  </div>
                </div>
                <div className="col-span-3 rounded-lg bg-background/50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-8 w-32 rounded bg-muted" />
                    <div className="h-8 w-24 rounded bg-primary/50" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-24 rounded-lg bg-muted" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
