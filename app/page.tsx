import { Header } from "@/components/header"
import { FixedSectionsContainer } from "@/components/fixed-sections-container"
import { ServiceSection } from "@/components/sections/service-section"
import { CoverageSection } from "@/components/sections/coverage-section"
import { StrengthSection } from "@/components/sections/strength-section"
import { CTASection } from "@/components/sections/cta-section"
import { MediaSection } from "@/components/sections/media-section"
import { Footer } from "@/components/footer"

export const revalidate = 60

export default function Home() {
  return (
    <main
      className="bg-[var(--background)] min-h-screen"
      style={{
        scrollSnapType: "y proximity",
      }}
    >
      {/* Fixed Header */}
      <Header />
      
      {/* Hero and Mission with scroll-snap fade transitions */}
      <FixedSectionsContainer />

      {/* Normal flow sections - no spacer needed */}
      <ServiceSection />
      <CoverageSection />
      <StrengthSection />
      <CTASection />
      <MediaSection />
      <Footer />
    </main>
  )
}
