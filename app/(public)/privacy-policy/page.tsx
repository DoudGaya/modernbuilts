import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: June 24, 2025
          </p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              StableBricks ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Investment preferences and financial information</li>
              <li>Identity verification documents</li>
              <li>Communication records</li>
              <li>Payment and transaction information</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>IP addresses and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our investment services</li>
              <li>Process transactions and manage your account</li>
              <li>Communicate about opportunities and updates</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Prevent fraud and enhance security</li>
              <li>Analyze website usage and improve user experience</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers and business partners</li>
              <li>Legal and regulatory authorities when required</li>
              <li>Professional advisors (lawyers, accountants)</li>
              <li>Affiliates within our corporate group</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Our website may contain links to third-party services. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of the revised policy.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <strong>Email:</strong> privacy@stablebricks.com
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
