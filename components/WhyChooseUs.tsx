import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, Users, Award, Clock, HeartHandshake } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Secure Investments",
    description: "All investments are backed by real assets and legal documentation for maximum security.",
  },
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Enjoy competitive returns ranging from 15-25% annually on your real estate investments.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team of real estate professionals ensures every project meets the highest standards.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Over 10,000 satisfied investors and ₦50B+ in successful project completions.",
  },
  {
    icon: Clock,
    title: "Transparent Process",
    description: "Real-time updates on your investments with detailed progress reports and analytics.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Partnership",
    description: "Building long-term relationships with investors through reliability and integrity.",
  },
]

export const WhyChooseUs = () => {
  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Why Choose StableBricks?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to making real estate investment accessible, profitable, and secure for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl font-poppins">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-yellow-400 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold font-poppins mb-4">Ready to Start Investing?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of investors who trust StableBricks for their real estate investment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Start Investing Today
            </button>
            <button className="border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
