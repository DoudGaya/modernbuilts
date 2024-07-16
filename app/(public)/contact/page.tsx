import React from 'react'
import { ContactBanner } from './_components/ContactBanner'
import stablebricks from '@/public/stablebricks.png'
import { RiTwitterXFill } from "react-icons/ri";
import { RiWhatsappLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import Link from 'next/link'
import Image from 'next/image'
import contactImage from '@/public/img/contact-image.jpg'
import { ContactForm } from './_components/ContactForm';


const socials = [
  {
    name: 'whatsapp',
    url: 'https://wa.link/oj2ysz',
    icon: <RiWhatsappLine />
  },
  {
    name: 'call',
    url: '+23462249834',
    icon: <IoCallOutline />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/stablebricks/',
    icon: <FaLinkedin />
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/stablebricks',
    icon: <RiTwitterXFill />
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/stablebricksltd/',
    icon: <RiInstagramLine />
  },

  {
    name: 'Facebook',
    url: 'https://web.facebook.com/stablebricks/',
    icon: <FaFacebookF />
  },
]


const page = () => {
  return (
    <div className=' flex flex-col'>
       <ContactBanner />
      <div className=" w-full flex flex-col py-20 border">
        <div className=" flex flex-col space-y-4 mx-auto max-w-4xl w-full px-10 items-center text-center ">
         <div className=" flex ">
          <Image src={stablebricks} className=' h-20 object-contain object-center' alt='Stable Bricks Logo ' />
         </div>
          <p className=' text-lg'>
            The Nigerian Construction and Real Estate company
          </p>
          <div className=" grid grid-cols-1 gap-6 w-full max-w-4xl lg:grid-cols-2">

            <div className=" lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 bg-white shadow-lg w-full justify-center space-y-4 ">
                  <div style={{
                    backgroundImage: `url(${contactImage.src})`
                  }} className=" bg-cover bg-center bg-no-repeat h-[300px] md:h-full py-10">
                   
                  </div>
                  <div className=" py-10">
                    <ContactForm />
                  </div>
            </div>


              {/* the office address */}

              <div className=" bg-white shadow-lg py-10 w-full justify-center flex flex-col space-y-4 ">
                    <h1 className=' font-semibold text-lg'>Our Office Address</h1>
                    <p>Kundila Housing Estate, Tarauni Kano.</p>
                    <div className=" flex w-full py-3 justify-center items-center text-center">
                        <a href="https://maps.app.goo.gl/fggkCEztSf5mPaNb6" target='_blank' className=' py-2 px-6 cursor-pointer bg-primary '>Find on Maps</a>
                    </div>
                </div>
           
            <div className=" bg-white shadow-lg w-full py-10 justify-center flex flex-col space-y-4 ">
              <h1 className=' font-semibold text-lg'>Contacts</h1>
              <p>{"(+234) 806 224 9834"}</p>
                <div className=" flex flex-row space-x-4 py-2 items-center justify-center ">
                    {
                      socials.map((social) => {
                          return (
                              <a target='_blank' key={social.url} className=' p-2 bg-yellow-50 ease-in-out transition-all hover:bg-yellow-500 rounded-md' 
                              href={ social.name == 'call' ? `tel:${social.url}` : social.url}
                              > {social.icon} </a>
                          )
                      })
                    }
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default page