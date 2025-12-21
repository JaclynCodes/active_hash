import { Layers, Zap, Shield, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Automation",
    description:
      "Create powerful workflows in minutes, not hours. Our drag-and-drop builder makes automation accessible to everyone.",
  },
  {
    icon: Layers,
    title: "Seamless Integrations",
    description: "Connect with 200+ tools you already use. From Slack to Salesforce, we've got you covered.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption. Your data is protected by industry-leading security standards.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get real-time insights into your workflows. Track performance, identify bottlenecks, and optimize continuously.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border/40 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Everything You Need to Scale</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Powerful features designed to help teams of all sizes work smarter, not harder.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/40 bg-muted/20 p-6 transition-all hover:border-primary/50 hover:bg-muted/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
