import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ApproachSection from "@/components/sections/ApproachSection";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import HomeWorkSection from "@/components/sections/HomeWorkSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactCtaSection from "@/components/sections/ContactCtaSection";

const Home = async () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-2 font-inter tablet:px-[10%] laptop:px-[15%]">
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <ServiceSection />
      <HomeWorkSection />
      <FaqSection />
      <ContactCtaSection />
    </main>
  );
};

export default Home;


