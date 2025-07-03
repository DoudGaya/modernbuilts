import { Banner } from "@/components/Banner"
import { HomeAbout } from "@/components/HomeAbout"
import { HomeWhatWeDo } from "@/components/WhatWeDo"
import { HomeMarketing2 } from "@/components/HomeMarketing2"
import { HomeIcons } from "@/components/HomeIcons"
import { HomeSales } from "@/components/HomeSales"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { FeaturedProperties } from "@/components/FeaturedProperties"
import { InvestmentHighlightsWrapper } from "@/components/InvestmentHighlightsWrapper"
import { Testimonials } from "@/components/Testimonials"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { verifyNIN } from "@/actions/nin"


export default async function Home() {
  await verifyNIN("81392154948").then(result => {
  if (result.status === 200) {
    console.log("NIN verified successfully")
  } else {
    console.log({ error: "NIN verification failed", details: result })
  }
})
  return (
    <>
      <PublicNavigations />
      <div className="flex flex-col bg-white">
        <Banner />
        <HomeAbout />
        <div className="w-full flex-col flex">
          <div className="max-w-7xl mx-auto"></div>
          <div className="">
            <HomeWhatWeDo />
            <InvestmentHighlightsWrapper />
            <div className="">
              <div className="my-10">
                <HomeSales />
              </div>
            </div>
            <FeaturedProperties />
            <HomeMarketing2 />
            <WhyChooseUs />
            <Testimonials />
          </div>
          <div className="">
            <HomeIcons />
          </div>
          <NewsletterSignup />
        </div>
      </div>
      <Footer />
    </>
  )
}

// import { Banner } from "@/components/Banner";
// import { HomeAbout } from "@/components/HomeAbout";
// import { HomeWhatWeDo } from "@/components/WhatWeDo";
// import { HomeMarketing2} from "@/components/HomeMarketing2";
// import { HomeIcons } from "@/components/HomeIcons";
// import { Metrics } from "@/components/Metrics";
// import { TheTeam } from "@/components/TheTeam";
// import { HomeSales } from "@/components/HomeSales";
// import { PublicNavigations } from "@/components/PublicNavigations";
// import { Footer } from "@/components/Footer";

// export default function Home() {
//   return (
//   <>
//   <PublicNavigations />
//   <div className=" flex flex-col bg-white">
//     <Banner />
//     <HomeAbout />
//     <div className="w-full flex-col flex">
//       <div className=" max-w-7xl  mx-auto">
//       </div>
//         <div className="">
//         <HomeWhatWeDo />
//         <div className="">
//         <div className=" my-10">
//         <HomeSales />
//         </div>
//         </div>
//         <HomeMarketing2 />
//         </div>
//        <div className="">
//        <HomeIcons />
//        </div>
//     </div>
//   </div>
//   <Footer />
//   </>
//   );
// }


