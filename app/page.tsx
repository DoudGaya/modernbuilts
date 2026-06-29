import { Banner } from "@/components/Banner"
import { HomeAbout } from "@/components/HomeAbout"
import { HomeWhatWeDo } from "@/components/WhatWeDo"
import { HomeMarketing2 } from "@/components/HomeMarketing2"
import { HomeIcons } from "@/components/HomeIcons"
import { HomeSales } from "@/components/HomeSales"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { FeaturedProperties } from "@/components/FeaturedProperties"
import { PropertyShowcase } from "@/components/PropertyShowcase"
import { Testimonials } from "@/components/Testimonials"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { WhyChooseUs } from "@/components/WhyChooseUs"

export default async function Home() {
  return (
    <>
      <PublicNavigations />
      <div className="flex flex-col bg-white">
        <Banner />
        <HomeAbout />

        <div className="w-full flex flex-col">
          <HomeWhatWeDo />
          <PropertyShowcase />

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


