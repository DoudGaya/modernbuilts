import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserContactForm } from './_components/UserContactForm'
import { Mail, MessageSquare, HelpCircle, Phone } from 'lucide-react'

const contactReasons = [
  {
    icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
    title: "General Inquiry",
    description: "Questions about our services, platform, or general information"
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-green-600" />,
    title: "Technical Support",
    description: "Issues with the platform, account access, or technical difficulties"
  },
  {
    icon: <Mail className="w-6 h-6 text-purple-600" />,
    title: "Investment Support",
    description: "Questions about your investments, projects, or financial matters"
  },
  {
    icon: <Phone className="w-6 h-6 text-orange-600" />,
    title: "Urgent Matters",
    description: "For urgent issues that require immediate attention"
  }
]

const quickContacts = [
  {
    title: "Email Support",
    info: "info@stablebricks.com",
    action: "Send Email",
    link: "mailto:info@stablebricks.com"
  },
  {
    title: "Phone Support",
    info: "(+234) 806 224 9834",
    action: "Call Now",
    link: "tel:+2348062249834"
  },
  {
    title: "WhatsApp",
    info: "Quick messaging support",
    action: "Chat Now",
    link: "https://wa.link/oj2ysz"
  }
]

export default function UserContactPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Contact Support
        </h1>
        <p className="text-gray-600">
          Need help? Send us a message and our support team will get back to you promptly.
        </p>
      </div>

      {/* Contact Reasons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {contactReasons.map((reason, index) => (
          <Card key={index} className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-center mb-3">
                {reason.icon}
              </div>
              <h3 className="font-semibold text-sm mb-2">{reason.title}</h3>
              <p className="text-xs text-gray-600">{reason.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Send us a Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll respond within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserContactForm />
          </CardContent>
        </Card>

        {/* Quick Contact Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Contact Options</CardTitle>
              <CardDescription>
                Need immediate assistance? Use these direct contact methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{contact.title}</h4>
                    <p className="text-xs text-gray-600">{contact.info}</p>
                  </div>
                  <a
                    href={contact.link}
                    target={contact.link.startsWith('http') ? '_blank' : undefined}
                    className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    {contact.action}
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  <strong>Note:</strong> Urgent matters will be addressed outside business hours.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
