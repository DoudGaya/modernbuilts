import Image from 'next/image'
import React from 'react'
import logo from '@/public/stable-bricks-white.png'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'



export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/stablebricks", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/stablebricks", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/stablebricks", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/stablebricks", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image 
                src={logo} 
                className="h-12 w-auto object-contain" 
                alt="StableBricks Logo" 
                priority
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Nigeria's most reliable construction company. We connect investors with 
              profitable construction projects in urban areas, delivering high returns 
              with minimal risk through transparent and sustainable development.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="bg-gray-800 hover:bg-yellow-500 transition-colors duration-300 p-2 rounded-full group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Properties", href: "/properties" },
                { name: "Investments", href: "/investments" },
                { name: "Projects", href: "/projects" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Investment Opportunities", href: "/investments" },
                { name: "Property Development", href: "/properties" },
                { name: "Investor Relations", href: "/investor-relations" },
                { name: "Partnerships", href: "/partnerships" },
                { name: "Land Submissions", href: "/land-submissions" },
                { name: "Portfolio", href: "/portfolio" },
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href}
                    className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-yellow-500 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Hamisu Abba Plaza, Tarauni<br />
                      Kano State, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <Link 
                    href="tel:+2348062249834" 
                    className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 text-sm"
                  >
                    +234 806 224 9834
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <Link 
                    href="mailto:info@stablebricks.com" 
                    className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 text-sm"
                  >
                    info@stablebricks.com
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full">
              <h3 className="text-lg font-semibold text-yellow-500 mb-6">Find Us</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  className="w-full h-48 lg:h-56" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31223.64261811877!2d8.515904689540227!3d11.977593059661778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8199ae590507%3A0x466f5cb1734cb983!2sTarauni%2C%20Kano%20700102%2C%20Kano!5e0!3m2!1sen!2sng!4v1714818643021!5m2!1sen!2sng" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="StableBricks Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} StableBricks. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Refund Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
