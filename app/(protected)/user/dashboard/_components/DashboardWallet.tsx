import React from 'react'
import Link from 'next/link'

interface WalletProps {
  balance: number
  totalRewards: number
  referralBonus: number
  welcomeBonus: number
}


export const DashboardWallet = ({
  balance,
  totalRewards,
  referralBonus,
  welcomeBonus
}: WalletProps) => {


  const formattedDigits = {
    balance: balance.toLocaleString(),
    totalRewards: totalRewards.toLocaleString(),
    referralBonus: referralBonus.toLocaleString(),
    welcomeBonus: welcomeBonus.toLocaleString()
  }
  return (
    <div className=' w-full h-full flex flex-col space-y-6 dark:text-[#ffffff] rounded-xl pt-6 dark:border dark:border-neutral-800 dark:bg-neutral-900/95 bg-white drop-shadow-md'>
      <div className=" flex items-center px-6 space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-10 dark:stroke-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
      </svg>
      <p className=' font-poppins font-semibold dark:text-white text-black/80 bg'>Stablebricks Wallet</p>

      </div>
      <div className=" flex flex-col md:w-full md:flex-row md:justify-between px-3 md:px-6 w-full">

      <div className=" flex flex-col py-3">
          <p className=' text-black/60 font-bold dark:text-[#8F8F8F]'>BALANCE</p>
          <div className=" flex space-x-1 items-baseline">
            <p className=' font-poppins text-3xl dark:text-primary font-semibold'>{ formattedDigits.balance }</p>
            <span  className=' font-bold text-black/60 dark:text-white/40 '>NGN</span>
        </div>
      </div>

      <div className=" flex md:space-x-6 space-y-3 md:space-y-0 flex-col items-start md:flex-row">
        {/* WALLET BUTTONS COMPONENTS */}

        <button className=' flex flex-col justify-center items-center space-y-2 '>
          <div className='stroke-black md:w-[50px] md:h-[50px] space-x-4 px-6 items-center md:space-x-0 justify-center flex text-center py-1 md:p-3 rounded-lg md:rounded-full bg-green-500/80'>
          <p className=' flex md:hidden'> Fund Wallet </p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" strokeWidth={1.2} fill="currentColor" className="size-4 transform rotate-180  flex-none md:size-6">
              <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className=' text-xs font-poppins hidden md:block font-medium'>Fund Wallet</p>
        </button>


        <button className=' flex flex-col justify-center items-center space-y-2'>
          <div className='stroke-black md:w-[50px] md:h-[50px] space-x-4 md:space-x-0 px-6 items-center justify-center flex text-center py-1 md:p-3 rounded-lg md:rounded-full bg-primary/80'>
          <p className=' flex md:hidden'> withdraw </p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" strokeWidth={1.2} fill="currentColor" className="size-4 flex-none md:size-6">
              <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className=' text-xs font-poppins hidden md:block font-medium'>Withdraw</p>
        </button>

      
      </div>
      </div>
      <div className=" bg-black w-full rounded-b-xl space-y-4 p-4 flex flex-col">
        <div className=" flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between">
         <div className=" flex flex-col space-y-2">
          <p className=' font-semibold font-poppins text-[#8F8F8F] text-lg'>REWARDS</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-primary size-8 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>  
         </div>
         <div className=" flex flex-col space-y-2">
          <p className=' font-font text-sm font-semibold text-[#8F8F8F]'>REWARDS</p>
         <div className=" flex space-x-2 items-baseline text-[#8F8F8F] ">
          <p className=' text-2xl font-poppins font-bold text-primary'>{ formattedDigits.totalRewards }</p>
          <span className=' font-bold text-[#8F8F8F]'>NGN</span>
         </div>
         </div>
        </div>
        <div className=" flex flex-col md:flex-row text-[#8F8F8F] w-full md:justify-between space-y-4 md:space-y-0">
         <div className=" flex space-x-3">
         <Link href={''} className=" hover:bg-gray-600/40 p-2 rounded-lg flex flex-col font-poppins">
              <p className=' text-sm text-white'>Welcome Bonus</p>
              <div className=" flex space-x-1 items-baseline">
                  <p className=' font-semibold text-xl text-primary'>{ formattedDigits.welcomeBonus }</p>
                  <span className=' font-semibold text-sm'>NGN</span>
              </div>
          </Link>
          <Link href={''} className=" hover:bg-gray-600/40 p-2 rounded-lg flex flex-col font-poppins">
              <p className=' text-sm text-white'>Referral Bonus</p>
              <div className=" flex space-x-1 items-baseline">
                  <p className=' font-semibold text-xl text-primary'>{ formattedDigits.referralBonus}</p>
                  <span className=' font-semibold text-sm'>NGN</span>
              </div>
          </Link>
         </div>
         <div className=" flex items-center  md:justify-end">
          <Link href={''} className=' pl-4 pr-10 text-black flex space-x-1 items-center font-poppins font-semibold  rounded-xl bg-primary py-2'>
            <p>Go to Wallet</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
         </div>
        </div>
      </div>
    </div>
  )
}
