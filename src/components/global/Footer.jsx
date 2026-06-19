import React from "react";
import Link from "next/link";
import Image from "next/image";
import { header } from "@/data/nav";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white px-2 py-12 tablet:px-[10%] laptop:px-[15%]">
      {/* Top half: Grid of information */}
      <div className="grid grid-cols-1 gap-10 px-4 py-4 tablet:grid-cols-2 laptop:grid-cols-4 tablet:px-5">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="inline-block w-28 overflow-hidden tablet:w-32"
          >
            <Image
              src="/egostix-media-trans.png"
              alt="Egostix Media Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </Link>
          <div className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase font-medium">
            Where Imagination Meets Intelligence
          </div>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            An AI-native productized software and media studio. We build
            frameworks that scale, learn, and evolve.
          </p>
        </div>

        {/* Navigation Column - aligned with Header nav data */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
            System Routes
          </h4>
          <nav className="flex flex-col space-y-2 text-sm">
            {header.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="text-slate-700 hover:text-blue-700 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Offerings Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
            Offerings
          </h4>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link
              href="/service#websites"
              className="text-slate-700 hover:text-blue-700 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
            >
              AI Business Websites
            </Link>
            <Link
              href="/service#tools"
              className="text-slate-700 hover:text-blue-700 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
            >
              AI Internal Tools for SMBs
            </Link>
            <Link
              href="/service#creator"
              className="text-slate-700 hover:text-blue-700 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
            >
              Creator Infrastructure
            </Link>
            <Link
              href="/service#automation"
              className="text-slate-700 hover:text-blue-700 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
            >
              AI Workflow Automation
            </Link>
          </nav>
        </div>

        {/* Coordinates Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
            Coordinates
          </h4>
          <div className="flex flex-col space-y-2 text-sm text-slate-700">
            <a
              href="mailto:contact@egostix.com"
              className="hover:text-blue-700 transition-colors duration-150 w-fit"
            >
              contact@egostix.com
            </a>
            <a
              href="tel:+917319274817"
              className="hover:text-blue-700 transition-colors duration-150 w-fit"
            >
              +91 73192 74817
            </a>
            <p className="text-slate-700">Badkulla, West Bengal, India</p>
            <p className="text-xs text-slate-500 pt-1 font-mono">
              media.egostix.com
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Timeline process visual (Discover -> Prototype -> Integrate -> Scale) */}
      {/* <div className="border-t border-neutral-200 mt-10 pt-10 pb-6 px-4 tablet:px-5">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
          <div className="max-w-xs">
            <h5 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
              Execution Model
            </h5>
            <p className="text-xs text-slate-700 mt-1">
              Our structured process compresses time-to-value for every project.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-medium text-slate-700 bg-slate-50 border border-neutral-100 rounded-lg p-3 w-fit">
            <span className="flex items-center text-slate-900 font-semibold">
              <span className="bg-slate-200/80 text-slate-800 rounded px-1.5 py-0.5 mr-1 text-[10px]">01</span>
              Discover
            </span>
            <span className="text-slate-400 font-normal px-1">→</span>
            <span className="flex items-center text-slate-900 font-semibold">
              <span className="bg-slate-200/80 text-slate-800 rounded px-1.5 py-0.5 mr-1 text-[10px]">02</span>
              Prototype
            </span>
            <span className="text-slate-400 font-normal px-1">→</span>
            <span className="flex items-center text-slate-900 font-semibold">
              <span className="bg-slate-200/80 text-slate-800 rounded px-1.5 py-0.5 mr-1 text-[10px]">03</span>
              Integrate
            </span>
            <span className="text-slate-400 font-normal px-1">→</span>
            <span className="flex items-center text-blue-700 font-bold">
              <span className="bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 mr-1 text-[10px]">04</span>
              Scale
            </span>
          </div>
        </div>
      </div> */}

      {/* Bottom half: Copyright and legal */}
      <div className="border-t border-neutral-200 mt-6 pt-6 px-4 tablet:px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Egostix Engineering Pvt. Ltd. All rights
          reserved.
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-[10px] uppercase text-slate-400">
            An Egostix Engineering Company
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link
            href="/privacy"
            className="hover:text-blue-700 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-700 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
