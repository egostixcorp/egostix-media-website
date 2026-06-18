import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[620px] w-full flex-col items-center justify-center px-6 pt-24 text-center">
      <h1 className="max-w-5xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl">
        We Engineer <span className="font-bold text-blue-700">Software</span>
        <br /> & Modern <span className="font-bold text-blue-700">
          Media
        </span>{" "}
        technology
      </h1>

      <p className="mt-6 max-w-2xl text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
        Creativity, engineering, and intelligence merged into one system that
        transforms ideas into measurable outcomes.
      </p>

      <div className="absolute -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="absolute left-1 top-[20%] size-24 overflow-hidden rounded border border-neutral-200 bg-white tablet:size-32 desktop:left-[5%] desktop:top-[50%]">
        <Image
          src="/c.png"
          width={500}
          height={500}
          alt="Creativity system"
          className="size-full object-cover"
        />
      </div>
      <div className="absolute right-1 top-[20%] size-24 overflow-hidden rounded border border-neutral-200 bg-white tablet:size-32 desktop:left-[45%] desktop:top-[90%]">
        <Image
          src="/e.png"
          width={500}
          height={500}
          alt="Engineering system"
          className="size-full object-cover"
        />
      </div>
      <div className="absolute right-[30%] top-[80%] size-24 overflow-hidden rounded border border-neutral-200 bg-white tablet:size-32 laptop:-right-10 desktop:right-[5%] desktop:top-[50%]">
        <Image
          src="/i.png"
          width={500}
          height={500}
          alt="Intelligence system"
          className="size-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
