import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ApproachSection from "@/components/sections/ApproachSection";
import AboutSection from "@/components/sections/AboutSection";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-2 font-inter tablet:px-[10%] laptop:px-[15%]">
      <HeroSection />
      <AboutSection />
      <ApproachSection />
    </main>
  );
};

export default Home;
