import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section className="border-t border-border/40 py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gestalt via-dissonance to-creep px-6 py-16 text-center md:px-12 md:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-4xl">
              Ready to Map Your Complexity?
            </h2>
            <p className="mb-8 text-pretty text-lg text-white/80">
              Join visionary teams who use Atlas to navigate and optimize their most complex systems.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-background hover:bg-white/90">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
