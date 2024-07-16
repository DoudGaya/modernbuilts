import React from 'react'
import { Poppins } from 'next/font/google'




const poppins = Poppins({
    subsets: ['latin'],
    weight: '600'
})
const contents = [
    {
        id: 1,
        title: 'Construction Materials',
        subtitle: 'Quality Matters',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-20 stroke-yellow-500 h-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>

        ),
        contents: 'We supply top-notch construction materials to builders, and contractors. From cement and steel to tiles and fixtures, we ensure that every product meets industry standards. Trust us to provide the building blocks for your next project.'
    },
    {
        id: 2,
        title: 'Consultation Services',
        subtitle: 'Expert Advice',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-20 stroke-yellow-500 h-20">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>

        ),
        contents: 'Need guidance on real estate investment? Our experienced consultants are here to assist you. Whether it’s market trends, legal matters, or financial planning, we offer personalized advice to help you make informed decisions'
    },
    {
        id: 1,
        title: 'Machinery and Tools Rental',
        subtitle: 'Efficiency at Your Fingertips',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-20 stroke-yellow-500 h-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>

        ),
        contents: 'Construction requires the right tools. Rent heavy machinery, scaffolding, and other equipment from StableBricks. Our well-maintained inventory ensures smooth project execution. Our products and tools are relaible and available'
    },
]

export const WhatWeDoAbout = () => {
  return (
<div className=" bg-yellow-50 py-20 w-full px-10">
            <div className=" w-full items-center py-10 text-center">
                <h2 className=' text-3xl font-poppins w-full'>Our Product and Services</h2>
            </div>
    <div className=" mx-auto grid gap-6 grid-cols-1 lg:grid-cols-3 max-w-7xl w-full ">
        {
            contents.map(( con ) => {
                return (
                    <div key={ con.id } className=" flex items-center space-y-4 text-center flex-col">
                        {
                            con.icon
                        }
                      <div className="">
                        <p className=' uppercase text-xs font-semibold text-yellow-950 '>{con.subtitle}</p>
                            <p className=' text-2xl font-semibold'>{con.title}</p>
                      </div>
                        <div className="">
                            <p className=''> {con.contents} </p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  </div>
  )
}
