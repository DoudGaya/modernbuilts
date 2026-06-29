import Image from "next/image"
import Link from "next/link"
import { AboutBanner } from "@/components/about/AboutBanner"
import { AboutWelcome } from "@/components/about/AboutWelcome"
import { TheTeam } from "@/components/TheTeam"
import { WhatWeDoAbout } from "@/components/about/WhatWeDoAbout"
import stablebricks from "@/public/stablebricks.png"

const AboutPage = () => {
  return (
    <div>
      <AboutBanner />
      <section className="w-full border-b bg-white py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-5 px-10 text-center">
          <Image src={stablebricks} className="h-20 w-auto object-contain object-center" alt="Stablebricks logo" />
          <p className="text-lg leading-8 text-gray-700">
            Stablebricks is repositioned around direct real estate sales, land and plot sales, construction delivery,
            procurement, contractors, and property partnerships across Nigeria. We focus on clear documentation,
            practical site information, and professional service.
          </p>
          <Link href="/properties" className="w-full rounded-md bg-primary px-6 py-3 font-semibold text-gray-950 lg:max-w-max">
            View properties
          </Link>
        </div>
      </section>
      <AboutWelcome />
      <WhatWeDoAbout />
      <TheTeam />
    </div>
  )
}

export default AboutPage
