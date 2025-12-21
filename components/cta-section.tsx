import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="border-t border-border/40 py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gestalt px-6 py-16 text-center md:px-12 md:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-balance text-3xl font-bold text-background md:text-4xl">
              Start Mapping Your Systems Today
            </h2>
            <p className="mb-8 text-pretty text-lg text-background/80">
              Join thousands of teams using Atlas to visualize complex systems and uncover hidden patterns with the
              dual-lens architecture.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background/20 bg-transparent text-background hover:bg-background/10"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
