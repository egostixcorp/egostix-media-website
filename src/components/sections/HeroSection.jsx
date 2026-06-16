import Image from "next/image";
import React from "react";
// import PartnersMarquee from "../sections/PartnersMarquee";
const HeroSection = () => {
  return (
    <div className="w-full relative h-[65vh] pt-28 laptop:pt-44 group flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl tablet:text-4xl laptop:text-7xl tracking-tight">
        We Engineer{" "}
        <span className="font-mono font-bold text-blue-700">Software</span>{" "}
        <br /> & Modern{" "}
        <span className="font-serif  font-bold text-blue-700 italic">
          Media
        </span>{" "}
        technology
      </h1>

      <p className="mt-4 max-w-xl text-sm tablet:text-base text-neutral-600 font-inter">
        <span
          className="font-serif
    transition-colors duration-300
    group-has-[creativity]:text-blue-600 italic"
        >
          Creativity
        </span>
        , <span className="font-mono">engineering</span>, and
        intelligence—merged into one seamless service that transforms ideas into
        real outcomes.
      </p>
      {/* <div class="relative h-full w-full bg-white"> */}
      <div class="absolute h-full -z-10  w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      {/* </div> */}
      {/* <div className="absolute bottom-2">
        <PartnersMarquee />
      </div> */}
      <div className="size-32 overflow-hidden absolute top-[20%] left-1 desktop:top-[50%] desktop:left-[5%] group-[creativity]">
        <Image
          src={"/c.png"}
          width={500}
          height={500}
          alt="create"
          className="size-full object-cover "
        />
      </div>
      <div className="size-32 overflow-hidden absolute top-[20%] right-1 desktop:top-[90%] desktop:left-[45%] group/[create]">
        <Image
          src={"/e.png"}
          width={500}
          height={500}
          alt="create"
          className="size-full object-cover"
        />
      </div>
      <div className="size-32 overflow-hidden absolute top-[80%] right-[30%] laptop:-right-10   desktop:top-[50%] desktop:right-[5%] group/[create]">
        <Image
          src={"/i.png"}
          width={500}
          height={500}
          alt="create"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
