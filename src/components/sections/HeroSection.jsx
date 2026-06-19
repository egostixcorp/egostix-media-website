import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[620px] w-full flex-col items-center justify-center px-6 pt-24 text-center">
      <h1 className="max-w-5xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-slate-900">
        We Engineer <span className="font-bold text-blue-700">Software</span>
        <br /> & Modern{" "}
        <span className="font-bold text-blue-700 font-serif italic">
          Media
        </span>{" "}
        technology
      </h1>

      <p className="mt-6 max-w-2xl text-sm font-inter leading-relaxed text-slate-700 tablet:text-base">
        Creativity, engineering, and intelligence merged into one system that
        transforms ideas into measurable outcomes.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md z-10">
        <Link
          href="#contact"
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-mono text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0 active:scale-100 shadow-sm"
        >
          Contact us to begin
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/service"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded border border-neutral-300 bg-white px-6 py-3 font-mono text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-blue-700 hover:text-blue-700 hover:bg-neutral-50 hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0 active:scale-100"
        >
          Explore offerings
        </Link>
      </div>

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
