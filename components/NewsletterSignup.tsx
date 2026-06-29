import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export const NewsletterSignup = () => {
  return (
    <section className="w-full bg-primary py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Card className="border-0 bg-white shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-950 lg:text-4xl">
              Get property alerts and service updates
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-gray-600">
              Receive new property listings, land releases, payment-plan notices, inspection windows, and procurement
              or contractor updates from Stablebricks.
            </p>

            <div className="mx-auto max-w-md">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input type="email" placeholder="Enter your email address" className="h-12 flex-1 text-base" />
                <Button size="lg" className="h-12 bg-gray-950 px-8 text-primary hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-500">No spam. Only relevant property and service updates.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-primary-700">Property</div>
                <div className="text-gray-600">Sales and inspections</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-primary-700">Land</div>
                <div className="text-gray-600">Plots and submissions</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-primary-700">Build</div>
                <div className="text-gray-600">Procurement and contractors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
