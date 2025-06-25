import React from 'react'
import { ContactBanner } from './_components/ContactBanner'
import stablebricks from '@/public/stablebricks.png'
import { RiTwitterXFill } from "react-icons/ri";
import { RiWhatsappLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import Link from 'next/link'
import Image from 'next/image'
import contactImage from '@/public/img/contact-image.jpg'
import { ContactForm } from './_components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const socials = [
  {
    name: 'whatsapp',
    url: 'https://wa.link/oj2ysz',
    icon: <RiWhatsappLine className="w-5 h-5" />
  },
  {
    name: 'call',
    url: '+23462249834',
    icon: <IoCallOutline className="w-5 h-5" />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/stablebricks/',
    icon: <FaLinkedin className="w-5 h-5" />
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/stablebricks',
    icon: <RiTwitterXFill className="w-5 h-5" />
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/stablebricksltd/',
    icon: <RiInstagramLine className="w-5 h-5" />
  },
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/stablebricks/',
    icon: <FaFacebookF className="w-5 h-5" />
  },
]

const contactInfo = [
  {
    icon: <MdLocationOn className="w-6 h-6 text-primary" />,
    title: "Our Office",
    info: "Kundila Housing Estate, Tarauni Kano, Nigeria",
    action: "Get Directions",
    link: "https://maps.app.goo.gl/fggkCEztSf5mPaNb6"
  },
  {
    icon: <IoCallOutline className="w-6 h-6 text-primary" />,
    title: "Call Us",
    info: "(+234) 806 224 9834",
    action: "Call Now",
    link: "tel:+23462249834"
  },
  {
    icon: <MdEmail className="w-6 h-6 text-primary" />,
    title: "Email Us",
    info: "info@stablebricks.com",
    action: "Send Email",
    link: "mailto:info@stablebricks.com"
  },
  {
    icon: <MdAccessTime className="w-6 h-6 text-primary" />,
    title: "Business Hours",
    info: "Mon - Fri: 9:00 AM - 6:00 PM",
    action: "",
    link: ""
  }
]

const page = () => {
  return (
    <div className="flex flex-col">
      <ContactBanner />
      
      {/* Main Content */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Image src={stablebricks} className="h-16 object-contain" alt="Stable Bricks Logo" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch With Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nigeria's leading construction and real estate company. We're here to help you with your investment needs.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.info}</p>
                  {item.action && item.link && (
                    <a 
                      href={item.link} 
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      className="text-primary hover:text-primary font-medium text-sm"
                    >
                      {item.action}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>

            {/* Contact Image & Info */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div 
                  style={{ backgroundImage: `url(${contactImage.src})` }}
                  className="bg-cover bg-center bg-no-repeat h-64 relative"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">Visit Our Office</h3>
                      <p className="text-lg">Experience excellence in person</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-4">
                    {socials.map((social) => (
                      <a
                        key={social.url}
                        target="_blank"
                        className="p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors duration-300"
                        href={social.name === 'call' ? `tel:${social.url}` : social.url}
                        title={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  <p className="text-center text-gray-600 mt-4">
                    Follow us on social media for updates and insights
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Find Us on the Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31223.64261811877!2d8.515904689540227!3d11.977593059661778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8199ae590507%3A0x466f5cb1734cb983!2sTarauni%2C%20Kano%20700102%2C%20Kano!5e0!3m2!1sen!2sng!4v1714818643021!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="StableBricks Office Location"
                ></iframe>              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default page