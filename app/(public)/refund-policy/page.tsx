import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Mail, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Refund Policy | StableBricks",
  description: "Refund Policy for StableBricks - Learn about our refund procedures and investment withdrawal policies.",
}

export default function RefundPolicyPage() {
  return (
    <>
      <PublicNavigations />
      <div className="min-h-screen bg-gray-50 py-12 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 rounded-full p-3">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardContent className="p-8 prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview</h2>
                <p className="text-gray-700 mb-4">
                  This Refund Policy outlines the terms and conditions for refunds and withdrawals related to investments made through StableBricks. Please read this policy carefully before making any investment decisions.
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> Real estate investments are generally illiquid and long-term in nature. Please ensure you understand the terms before investing.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Investment Withdrawal Policy</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Cooling-Off Period</h3>
                <p className="text-gray-700 mb-4">
                  Investors have a <strong>7-day cooling-off period</strong> from the date of investment confirmation during which they may request a full refund of their investment, subject to the following conditions:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>The cooling-off period begins from the date of investment confirmation email</li>
                  <li>No partial withdrawals are allowed during this period</li>
                  <li>Refunds will be processed within 5-10 business days</li>
                  <li>Original payment method will be used for the refund</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Early Withdrawal</h3>
                <p className="text-gray-700 mb-4">
                  After the cooling-off period, early withdrawal requests may be considered under exceptional circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Medical Emergency:</strong> Documented medical expenses</li>
                  <li><strong>Job Loss:</strong> Involuntary unemployment with supporting documentation</li>
                  <li><strong>Financial Hardship:</strong> Unforeseen financial difficulties</li>
                </ul>
                
                <p className="text-gray-700 mb-4">
                  Early withdrawal fees may apply:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Withdrawals within 6 months: 5% penalty fee</li>
                  <li>Withdrawals within 6-12 months: 3% penalty fee</li>
                  <li>Withdrawals after 12 months: 1% processing fee</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Refund Process</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 How to Request a Refund</h3>
                <ol className="list-decimal pl-6 text-gray-700 mb-6">
                  <li>Log into your StableBricks account</li>
                  <li>Navigate to "My Investments" section</li>
                  <li>Select the investment you wish to withdraw from</li>
                  <li>Click "Request Withdrawal" and follow the prompts</li>
                  <li>Provide necessary documentation if required</li>
                  <li>Submit your request for review</li>
                </ol>

                <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Processing Timeline</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Cooling-off period refunds:</strong> 5-10 business days</li>
                  <li><strong>Early withdrawal requests:</strong> 10-21 business days (including review time)</li>
                  <li><strong>Maturity withdrawals:</strong> 3-7 business days</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Non-Refundable Items</h2>
                <p className="text-gray-700 mb-4">
                  The following are non-refundable:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Service fees and transaction charges</li>
                  <li>Third-party payment processing fees</li>
                  <li>Legal and administrative costs</li>
                  <li>Returns already distributed to investors</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Investment Maturity</h2>
                <p className="text-gray-700 mb-4">
                  At investment maturity:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Principal amount plus returns will be automatically credited to your wallet</li>
                  <li>You can choose to reinvest or withdraw funds</li>
                  <li>No penalties apply to maturity withdrawals</li>
                  <li>Withdrawal processing takes 3-7 business days</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Force Majeure</h2>
                <p className="text-gray-700 mb-4">
                  In cases of force majeure (natural disasters, government actions, market disruptions), refund timelines may be extended. We will communicate any delays promptly to affected investors.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Dispute Resolution</h2>
                <p className="text-gray-700 mb-4">
                  If you disagree with a refund decision:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 mb-6">
                  <li>Contact our customer support team within 30 days</li>
                  <li>Provide additional documentation if requested</li>
                  <li>We will review your case within 14 business days</li>
                  <li>If unresolved, the matter may be escalated to arbitration</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For refund requests or questions about this policy:
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
                      <p className="text-gray-700 mb-1"><strong>Email:</strong> support@stablebricks.com</p>
                      <p className="text-gray-700 mb-1"><strong>Refunds:</strong> refunds@stablebricks.com</p>
                      <p className="text-gray-700 mb-1"><strong>Phone:</strong> +234 (0) 123 456 7890</p>
                      <p className="text-gray-700 mb-1"><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM WAT</p>
                      <p className="text-gray-700"><strong>Response Time:</strong> Within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <p className="text-sm text-gray-600 text-center">
                  This Refund Policy is governed by the laws of Nigeria. By investing with StableBricks, you acknowledge that you have read, understood, and agree to be bound by this policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
