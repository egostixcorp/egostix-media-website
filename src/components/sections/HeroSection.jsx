import React from "react";
import PartnersMarquee from "../sections/PartnersMarquee";
const HeroSection = () => {
  return (
    <div className="w-full relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl tablet:text-4xl laptop:text-7xl  tracking-tight">
        We Deliver{" "}
        <span className="font-serif laptop:text-8xl text-5xl font-bold text-blue-700 italic">
          Results
        </span>{" "}
        <br /> as a <span className="font-mono">Service</span>
      </h1>

      <p className="mt-4 max-w-xl text-sm tablet:text-base text-neutral-600 font-inter">
        <span className="font-serif">Creativity</span>,{" "}
        <span className="font-mono">engineering</span>, and intelligence—merged
        into one seamless service that transforms ideas into real outcomes.
      </p>
      {/* <div class="relative h-full w-full bg-white"> */}
      <div class="absolute h-full -z-10  w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      {/* </div> */}
      {/* <div className="absolute bottom-2">
        <PartnersMarquee />
      </div> */}
    </div>
  );
};

export default HeroSection;
