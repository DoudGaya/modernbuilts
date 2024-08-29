import React from 'react'
import { DashboadTopCard, DashboardTopcardProps } from './_components/DashboadTopCard'
import { DashboardWallet } from './_components/DashboardWallet'
import { DashboardProfile } from './_components/DashboardProfile'


const cards = [
  {
    title: "Active Project",
    amount: 12,
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
  </svg>,
  urlTo: "/user/projects"
  
  },
  {
    title: "All Projects",
    amount: 30,
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary ">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>,
  urlTo: "/user/projects"
  
  },
  {
    title: "Active Investment",
    amount: 20_000_000 ,
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>,
  urlTo: "/user/projects"
  
  },
  {
    title: "Total Return",
    amount: 4_000_000,
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>,
  urlTo: "/user/projects"
  
  },
]

const page = async () => {
  return (
    <div className=' bg-gray-50 flex flex-col h-full p-6 dark:bg-black/80 w-full'>
      <div className=" grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 py-10 gap-6">
        {
          cards.map((item: DashboardTopcardProps) => {
            return <DashboadTopCard 
            key={item.title}
            title={item.title} 
            amount={item.amount} 
            icon={item.icon} 
            urlTo={item.urlTo} 
            />
          })
        }
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardWallet
          balance={2500000}
          referralBonus={2000}
          welcomeBonus={5000}
          totalRewards={7500}
          />
          <DashboardProfile />
      </div>
    </div>
  )
}

export default page