import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ApproachSection from "@/components/sections/ApproachSection";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
const Home = () => {
  return (
    <div className="reds flex min-h-screen w-full flex-col items-center justify-center tablet:px-[15%] px-2 font-inter dark:bg-black">
      <HeroSection />
      {/* <div className="absolute bottom-2"> */}
      <div>
        <PartnersMarquee />
      </div>
      {/* </div> */}
      <ApproachSection />
    </div>
  );
};

export default Home;
