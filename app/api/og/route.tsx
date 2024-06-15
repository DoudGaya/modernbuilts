// @ts-ignore

import { ImageResponse } from 'next/og';
import logo from '@/public/img/logo-icon.png'
import Image from 'next/image';


export const runtime = "edge"
 
export async function GET( request: Request) {


    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.has("title")
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "StableBrick Engineering"


  

    const fontData = await fetch( new URL('../../../assets/fonts/logo-font.ttf', import.meta.url))
    .then(res => res.arrayBuffer());

    const imageData = await fetch( new URL('../../../assets/stable-bricks-white.png', import.meta.url))
    .then(res => res.arrayBuffer());


   try {
    return new ImageResponse(
        (
            <div tw="flex items-center bg-black h-screen w-full px-20 bg-black justify-center">
            <div tw="bg-gray-50 flex flex-col justify-center items-center">
              <div tw="flex flex-col md:flex-row w-full bg-black  py-12 px-4 md:items-center justify-center p-8">
                <h2 tw="flex flex-col text-3xl flex text-center justify-center sm:text-4xl tracking-tight text-gray-900 text-left">
                  {/* @ts-ignore */}
                  <img src={imageData} height={100} tw=' object-contain object-center flex'  alt="" />

                  <span tw='font-poppins text-black text-white text-5xl'>{ title }</span>
                  <span tw="text-yellow-600 uppercase font-bold"> {' Stable Engineering '} </span>
                </h2>
                <div tw="mt-8 flex flex-col md:mt-0">
                
                </div>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          // fonts: [
          //   {
          //   name: "Inter",
          //   data: fontData,
          //   style: 'normal',
          //   weight: 700,

          //   }
          // ]
        },
      );

   } catch (error: any) {
        return new Response("Image Generaion Failed")
   }
}