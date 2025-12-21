import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "StreamLine has completely transformed how our team works. We've automated 80% of our repetitive tasks and saved over 20 hours per week.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "TechFlow Inc.",
    avatar: "/professional-woman-headshot.png",
  },
  {
    quote:
      "The best investment we've made this year. The ROI was visible within the first month. Customer support is also phenomenal.",
    author: "Marcus Johnson",
    role: "CEO",
    company: "ScaleUp Studio",
    avatar: "/professional-man-headshot.png",
  },
  {
    quote:
      "Finally, a workflow tool that's actually intuitive. Our team adopted it immediately without any training required.",
    author: "Emily Rodriguez",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "images/testimonial-3.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-border/40 bg-muted/20 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Loved by Teams Worldwide</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Join thousands of companies that trust StreamLine to power their workflows.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col rounded-xl border border-border/40 bg-background p-6"
            >
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-muted-foreground">"{testimonial.quote}"</blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
