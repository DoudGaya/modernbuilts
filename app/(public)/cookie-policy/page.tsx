import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie, Settings, Mail } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Cookie className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: June 24, 2025
          </p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you use our site.
            </p>

            <h2>Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly and cannot be disabled:</p>
            <ul>
              <li><strong>Authentication cookies:</strong> Keep you logged in during your session</li>
              <li><strong>Security cookies:</strong> Protect against fraud and security threats</li>
              <li><strong>Session cookies:</strong> Maintain your session state across pages</li>
            </ul>

            <h3>Performance Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website:</p>
            <ul>
              <li><strong>Analytics cookies:</strong> Track page views, user behavior, and site performance</li>
              <li><strong>Error tracking:</strong> Help us identify and fix technical issues</li>
              <li><strong>Load balancing:</strong> Ensure optimal website performance</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>These cookies enhance your browsing experience:</p>
            <ul>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Language cookies:</strong> Store your preferred language</li>
              <li><strong>Region cookies:</strong> Customize content based on your location</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>These cookies help us deliver relevant content and advertisements:</p>
            <ul>
              <li><strong>Advertising cookies:</strong> Track your interests for targeted ads</li>
              <li><strong>Social media cookies:</strong> Enable social sharing features</li>
              <li><strong>Conversion tracking:</strong> Measure the effectiveness of our marketing</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>We may use third-party services that place cookies on your device:</p>
            
            <h3>Analytics Services</h3>
            <ul>
              <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
              <li><strong>Hotjar:</strong> User session recordings and heatmaps</li>
            </ul>

            <h3>Social Media</h3>
            <ul>
              <li><strong>Facebook:</strong> Social sharing and advertising</li>
              <li><strong>Twitter:</strong> Social sharing features</li>
              <li><strong>LinkedIn:</strong> Professional networking and sharing</li>
            </ul>

            <h3>Customer Support</h3>
            <ul>
              <li><strong>Intercom:</strong> Live chat and customer support</li>
              <li><strong>Zendesk:</strong> Help desk and support tickets</li>
            </ul>

            <h2>How Long Do Cookies Last?</h2>
            
            <h3>Session Cookies</h3>
            <p>These are temporary cookies that are deleted when you close your browser.</p>

            <h3>Persistent Cookies</h3>
            <p>These cookies remain on your device for a specified period:</p>
            <ul>
              <li><strong>Preference cookies:</strong> Up to 1 year</li>
              <li><strong>Analytics cookies:</strong> Up to 2 years</li>
              <li><strong>Marketing cookies:</strong> Up to 30 days</li>
            </ul>

            <h2>Managing Your Cookie Preferences</h2>
            
            <h3>Browser Settings</h3>
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
              <li><strong>Firefox:</strong> Preferences → Privacy & Security</li>
              <li><strong>Safari:</strong> Preferences → Privacy</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>

            <h3>Cookie Consent Banner</h3>
            <p>
              When you first visit our website, you'll see a cookie consent banner where you can:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Customize your preferences</li>
              <li>Reject non-essential cookies</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Settings className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Cookie Preferences</p>
                  <p className="text-sm text-blue-800">
                    You can change your cookie preferences at any time by clicking the "Cookie Settings" link in our website footer.
                  </p>
                </div>
              </div>
            </div>

            <h2>Impact of Disabling Cookies</h2>
            <p>Disabling certain cookies may affect your experience:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Website may not function properly</li>
              <li><strong>Performance cookies:</strong> We can't improve site performance</li>
              <li><strong>Functional cookies:</strong> Personalization features won't work</li>
              <li><strong>Marketing cookies:</strong> You'll see less relevant advertisements</li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We'll notify you of any significant changes by posting the updated policy on our website.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
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
