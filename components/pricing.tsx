import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Perfect for small teams getting started with automation.",
    features: ["Up to 5 team members", "1,000 tasks per month", "50+ integrations", "Basic analytics", "Email support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams that need more power and flexibility.",
    features: [
      "Up to 20 team members",
      "10,000 tasks per month",
      "200+ integrations",
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with advanced security needs.",
    features: [
      "Unlimited team members",
      "Unlimited tasks",
      "All integrations",
      "Custom reporting",
      "Dedicated support",
      "SSO & SAML",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border/40 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-6 ${
                plan.popular
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border/40 bg-muted/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                <div className="mb-2 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
