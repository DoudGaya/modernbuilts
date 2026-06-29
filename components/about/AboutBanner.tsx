import aboutImage from "@/public/city-view.jpg"

export const AboutBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${aboutImage.src})` }}
      className="mt-10 w-full bg-gray-950/80 bg-cover bg-center bg-no-repeat bg-blend-multiply text-white"
    >
      <div className="mx-auto flex min-h-[260px] w-full max-w-6xl flex-col justify-center px-10 py-20">
        <p className="text-sm font-bold uppercase text-primary">About Stablebricks</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal lg:text-5xl">
          Real estate, construction, and property partnerships for practical buyers.
        </h1>
      </div>
    </section>
  )
}
