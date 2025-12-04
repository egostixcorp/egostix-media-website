import React from "react";
import HeroSection from "@/components/sections/HeroSection";
const Home = () => {
  return (
    <div className="reds flex min-h-screen w-full flex-col items-center justify-center tablet:px-[15%] px-2 font-inter dark:bg-black">
      <HeroSection />
      {/* <CompanySection /> */}
    </div>
  );
};

export default Home;
