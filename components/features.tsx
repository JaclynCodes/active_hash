import { Eye, Network, Zap, Lightbulb } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Dual-Perspective Analysis",
    description:
      "See your systems from two complementary angles. The Actor Loop reveals entities and relationships, while the Chemistry Flow exposes abstract mechanisms.",
  },
  {
    icon: Network,
    title: "Interactive Visualization",
    description:
      "Explore complex architectures with animated node networks. Zoom, pan, and drill down to uncover hidden patterns in your system.",
  },
  {
    icon: Zap,
    title: "Real-time Insights",
    description:
      "Watch your systems evolve in real-time. Monitor state changes, track transformations, and identify bottlenecks as they happen.",
  },
  {
    icon: Lightbulb,
    title: "Pattern Recognition",
    description:
      "Discover emergent behaviors and feedback loops automatically. Atlas highlights critical connections others miss.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border/40 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Powerful Capabilities</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Designed to reveal the complexity of interconnected systems with clarity and precision.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/40 bg-muted/20 p-6 transition-all hover:border-gestalt/50 hover:bg-muted/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gestalt/10 text-gestalt transition-colors group-hover:bg-gestalt group-hover:text-background">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
