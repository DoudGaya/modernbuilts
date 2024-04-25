import { Banner } from "@/components/Banner";
import { HomeAbout } from "@/components/HomeAbout";
import { Metrics } from "@/components/Metrics";
import Image from "next/image";

export default function Home() {
  return (
  <div className="">
    <Banner />
    <HomeAbout />
    {/* <div className=" mx-auto  bg-black max-w-6xl">
      <Metrics />
    </div> */}
  </div>
  );
}
