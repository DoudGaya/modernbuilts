import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export const NewsletterSignup = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">
              Stay Updated with Investment Opportunities
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get exclusive access to new investment projects, market insights, and special offers delivered to your
              inbox
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="email" placeholder="Enter your email address" className="flex-1 h-12 text-base" />
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 h-12">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">₦50B+</div>
                <div className="text-gray-600">Total Investments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">150+</div>
                <div className="text-gray-600">Completed Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
