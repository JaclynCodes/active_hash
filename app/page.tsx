import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DualLens } from "@/components/dual-lens"
import { About } from "@/components/about"
import { Features } from "@/components/features"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <DualLens />
        <About />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
