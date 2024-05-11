import Link from 'next/link'
import aboutHouses from '@/public/img/about-yellow-houses.svg'
import Image from 'next/image'




export const AboutWelcome = () => {
  return (
    <div className=" w-full py-10">
    <div className=" mx-auto w-full gap-6 grid grid-cols-1 lg:grid-cols-2 px-10 lg:px-0 max-w-5xl ">
     <div className=" space-y-3 px-2 flex flex-col items-center justify-center">
        <h1 className='text-2xl font-bold text-center lg:text-start '>
          We are <span className=' bg-[rgb(249,206,86)] '>Reliable</span> We are  <span className=' bg-[rgb(249,206,86)] '> Trustworthy</span> and we get things done. 
        </h1>
        <p className='text-justify '>
            Welcome to <span className=' font-semibold'>{"Stablebricks".toUpperCase()} Nig. Ltd.</span> We specialize in raising funds for 
            exciting construction projects, such as hotels, real estate, shopping malls, 
            and much more. Our unique approach involves selling shares of each project to the public, 
            providing an opportunity for anyone to invest in the future of our communities.
        </p>
        <div className="py-3 font-poppin font-semibold text-start w-full  items-start ">
            <Link href={'/signup'} className=' px-6 bg-yellow-400 rounded-md py-2'> Join Us Now</Link>
        </div>
     </div>
     <div className="">
        <Image src={aboutHouses} alt='' className='' />
     </div>
    </div>
    </div>
  )
}
