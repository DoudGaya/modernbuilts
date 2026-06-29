import { MapPinned, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Adebayo Johnson",
    role: "Home buyer",
    location: "Lagos",
    rating: 5,
    comment:
      "The walkthrough images and route notes helped us shortlist the right home before travelling for inspection. The payment plan discussion was clear from the beginning.",
  },
  {
    id: 2,
    name: "Fatima Abdullahi",
    role: "Landowner",
    location: "Kano",
    rating: 5,
    comment:
      "Stablebricks reviewed our land submission professionally and explained the documentation, access, and partnership options without pressure.",
  },
  {
    id: 3,
    name: "Chinedu Okafor",
    role: "Commercial buyer",
    location: "Abuja",
    rating: 5,
    comment:
      "The team understood the finishing work we needed after purchase and connected the property sale with procurement and contractor support.",
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    role: "Contractor partner",
    location: "Kano",
    rating: 5,
    comment:
      "Their partner process is structured. We knew the site expectations, reporting process, and procurement requirements before committing resources.",
  },
]

export const Testimonials = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase text-primary-700">Client feedback</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950 lg:text-4xl">What buyers and partners value</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Clear information, site access, documentation discipline, and practical construction support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="mb-6 text-sm leading-7 text-gray-700">"{testimonial.comment}"</p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <h4 className="font-semibold text-gray-950">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <p className="inline-flex items-center gap-1 text-sm font-medium text-gray-600">
                    <MapPinned className="h-4 w-4 text-primary-700" />
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
