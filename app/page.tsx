import { Banner } from "@/components/Banner"
import { HomeAbout } from "@/components/HomeAbout"
import { HomeWhatWeDo } from "@/components/WhatWeDo"
import { HomeMarketing2 } from "@/components/HomeMarketing2"
import { HomeIcons } from "@/components/HomeIcons"
import { HomeSales } from "@/components/HomeSales"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { FeaturedProperties } from "@/components/FeaturedProperties"
import { InvestmentHighlights } from "@/components/InvestmentHighlights"
import { Testimonials } from "@/components/Testimonials"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { NINDebugger } from "@/components/NINDebugger"
import { verifyNIN } from "@/actions/nin"

export default async function Home() {
  // Debug NIN verification on page load
  const debugNIN = async (nin: string) => {
    console.log(`🔍 Debugging NIN verification for: ${nin}`)
    const result = await verifyNIN(nin)
    console.log("📋 NIN Verification Result:", result)
    return result
  }

  // Test NIN verification on server-side (page load)
  await debugNIN("81392154948") // Replace with actual NIN for testing

  return (
    <>
      <PublicNavigations />
      <div className="flex flex-col bg-white">
        <Banner />
        <HomeAbout />

        {/* NIN Debugger - Remove in production */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <NINDebugger />
        </div>

        <div className="w-full flex flex-col">
          <HomeWhatWeDo />
          <InvestmentHighlights />

          <div className="my-10">
            <HomeSales />
          </div>

          <FeaturedProperties />
          <HomeMarketing2 />
          <WhyChooseUs />
          <Testimonials />

          <HomeIcons />

          <NewsletterSignup />
        </div>
      </div>
      <Footer />
    </>
  )
}


