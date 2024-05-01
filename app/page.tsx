import { Banner } from "@/components/Banner";
import { HomeAbout } from "@/components/HomeAbout";
import { HomeCarousel } from "@/components/HomeCarousel";
import { HomeMarketing1 } from "@/components/HomeMarketing1";
import { HomeIcons } from "@/components/HomeIcons";
import { Metrics } from "@/components/Metrics";
import { TheTeam } from "@/components/TheTeam";

export default function Home() {
  return (
  <div className=" flex flex-col">
    <Banner />
    <HomeAbout />
    <div className=" bg-gray-200 w-full flex-col flex">
      <div className=" max-w-7xl bg-yellow-400 mx-auto">
        <HomeCarousel />
      </div>
        <div className="">
        <HomeMarketing1 />
        </div>
       <div className="">
       <HomeIcons />
       </div>
       <div className="">
        <TheTeam />
       </div>
    </div>
  </div>
  );
}


