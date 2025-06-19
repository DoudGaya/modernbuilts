import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Adebayo Johnson",
    role: "Business Owner",
    location: "Lagos",
    rating: 5,
    comment:
      "StableBricks has transformed my investment portfolio. I've earned over 20% returns on my investments in just 18 months. The transparency and professionalism are outstanding.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Fatima Abdullahi",
    role: "Software Engineer",
    location: "Abuja",
    rating: 5,
    comment:
      "As a first-time real estate investor, StableBricks made the process incredibly simple. The team guided me through every step, and I'm already seeing great returns.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Chinedu Okafor",
    role: "Doctor",
    location: "Port Harcourt",
    rating: 5,
    comment:
      "I've invested in three different projects with StableBricks. Each one has exceeded my expectations. The regular updates and professional management give me complete confidence.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    role: "Entrepreneur",
    location: "Kano",
    rating: 5,
    comment:
      "The minimum investment threshold made it possible for me to start with a small amount. Now I'm reinvesting my profits into larger projects. Excellent platform!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export const Testimonials = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">What Our Investors Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied investors have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold font-poppins">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9/5 Average Rating</span>
            <span className="text-gray-600">• 2,500+ Reviews</span>
          </div>
        </div>
      </div>
    </div>
  )
}
