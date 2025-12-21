export function About() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-to-r from-dissonance/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Understand Your Systems</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Atlas emerged from a fundamental question: <em>How do we see the unseeable?</em> Complex systems defy simple
            linear understanding. They require multiple perspectives, interconnected views, and the ability to zoom in
            and out without losing context.
          </p>
          <p className="mb-6 text-lg text-muted-foreground">
            The dual-lens architecture solves this by providing complementary views of your system. The Actor Loop shows
            you the entities and their relationships. The Chemistry Flow reveals the abstract mechanisms and
            transformations that drive behavior.
          </p>
          <p className="text-lg text-muted-foreground">
            Together, these lenses create a complete map of complexity—transforming chaos into clarity, and invisible
            patterns into actionable insights.
          </p>
        </div>
      </div>
    </section>
  )
}
