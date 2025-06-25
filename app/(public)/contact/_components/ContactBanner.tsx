import React from 'react'
import aboutImage from '@/public/city-view.jpg'
import Link from 'next/link'
import { ChevronRight, Mail, MessageSquare } from 'lucide-react'

export const ContactBanner = () => {
  return (
    <div 
      style={{ backgroundImage: `url(${aboutImage.src})` }} 
      className="bg-gray-900/90 pt-10 text-white bg-no-repeat bg-cover bg-center bg-blend-multiply w-full"
    >
      <div className="mx-auto w-full max-w-6xl py-20 px-4 lg:px-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-yellow-400 transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-yellow-400 font-medium">CONTACT</span>
          </div>
          
          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Have questions about our real estate investments? We're here to help you make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Mail className="w-5 h-5" />
                <span>info@stablebricks.com</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <MessageSquare className="w-5 h-5" />
                <span>(+234) 806 224 9834</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
