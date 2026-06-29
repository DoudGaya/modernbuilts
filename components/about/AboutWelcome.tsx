import Image from "next/image"
import Link from "next/link"
import aboutHouses from "@/public/img/about-yellow-houses.svg"

export const AboutWelcome = () => {
  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-10 lg:grid-cols-2 lg:px-0">
        <div className="flex flex-col justify-center space-y-5">
          <h2 className="text-3xl font-bold text-gray-950">
            Reliable real estate service, construction discipline, and buyer support.
          </h2>
          <p className="text-base leading-7 text-gray-700">
            Stablebricks Nig. Ltd. helps clients buy property, sell land, structure property payment plans, source
            construction materials, and coordinate contractors. We work across the transaction lifecycle: discovery,
            inspection, documentation, procurement, build support, and handover.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-gray-950">
              Speak with us
            </Link>
          </div>
        </div>
        <div>
          <Image src={aboutHouses} alt="Stablebricks homes" className="h-auto w-full" />
        </div>
      </div>
    </section>
  )
}
