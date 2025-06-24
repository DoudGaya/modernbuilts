import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Mail } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: June 24, 2025
          </p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using StableBricks' website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>About StableBricks</h2>
            <p>
              StableBricks is a construction and real estate investment company registered in Nigeria. We provide investment opportunities in construction projects across Nigeria, connecting investors with profitable development projects.
            </p>

            <h2>Investment Services</h2>
            <h3>Investment Opportunities</h3>
            <ul>
              <li>All investments carry inherent risks</li>
              <li>Past performance does not guarantee future results</li>
              <li>Investment returns are subject to market conditions</li>
              <li>Minimum investment amounts and terms apply</li>
            </ul>

            <h3>Eligibility</h3>
            <p>To use our investment services, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Have legal capacity to enter into contracts</li>
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and up-to-date information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Use our services in compliance with all applicable laws</li>
              <li>Not engage in fraudulent or illegal activities</li>
            </ul>

            <h2>Investment Terms</h2>
            <h3>Investment Process</h3>
            <ul>
              <li>All investments are subject to due diligence</li>
              <li>Investment agreements will specify terms and conditions</li>
              <li>Returns are paid according to project completion schedules</li>
              <li>Early withdrawal may not be available for all investments</li>
            </ul>

            <h3>Risk Disclosure</h3>
            <p>
              Real estate and construction investments involve significant risks, including but not limited to:
            </p>
            <ul>
              <li>Market fluctuations</li>
              <li>Construction delays</li>
              <li>Regulatory changes</li>
              <li>Economic conditions</li>
              <li>Force majeure events</li>
            </ul>

            <h2>Fees and Payments</h2>
            <ul>
              <li>Management fees and charges will be clearly disclosed</li>
              <li>Payments must be made through approved methods</li>
              <li>All fees are non-refundable unless specified otherwise</li>
              <li>Late payment charges may apply</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and software, is the property of StableBricks and protected by copyright and other intellectual property laws.
            </p>

            <h2>Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>

            <h2>Disclaimers</h2>
            <ul>
              <li>Our services are provided "as is" without warranties</li>
              <li>We do not guarantee specific investment returns</li>
              <li>Market conditions may affect investment performance</li>
              <li>Professional advice should be sought for significant investments</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              StableBricks' liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from your use of our services.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to our services at any time for violation of these terms or for any other reason. Upon termination, your right to use our services will cease immediately.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of Nigeria. Any disputes will be resolved through the appropriate courts in Nigeria.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on our website with an updated effective date. Continued use of our services constitutes acceptance of the modified terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <strong>Email:</strong> legal@stablebricks.com
              </div>
              <div><strong>Address:</strong> Hamisu Abba Plaza, Tarauni, Kano State, Nigeria</div>
              <div><strong>Phone:</strong> +234 806 224 9834</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
