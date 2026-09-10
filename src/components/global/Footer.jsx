import React from "react";
import Link from "next/link";
import Image from "next/image";
import InteractiveInquiryButton from "@/components/ui/InteractiveInquiryButton";

const navigationLinks = [
  { label: "About", route: "/about" },
  { label: "Services", route: "/service" },
  { label: "Work", route: "/work" },
  { label: "Approach", route: "/approach" },
  { label: "Blog", route: "/blog" },
  { label: "Contact", route: "/contact" },
];

const serviceLinks = [
  { label: "AI Business Websites", route: "/service#websites" },
  { label: "AI Internal Tools", route: "/service#tools" },
  { label: "Creator Infrastructure", route: "/service#creator" },
  { label: "AI Workflow Automation", route: "/service#automation" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white px-2 py-12 tablet:px-[10%] laptop:px-[15%]">
      {/* Top Grid */}
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
            An AI-native productized software and media studio under Egostix Engineering. We build frameworks that scale, learn, and evolve.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
            Navigation
          </h4>
          <nav className="flex flex-col space-y-2 text-sm font-inter">
            {navigationLinks.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="text-slate-700 hover:text-blue-600 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
            Services
          </h4>
          <nav className="flex flex-col space-y-2 text-sm font-inter">
            {serviceLinks.map((item, i) => (
              <Link
                key={i}
                href={item.route}
                className="text-slate-700 hover:text-blue-600 hover:translate-x-0.5 transition-all duration-150 ease-in-out w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Us Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
            Contact Us
          </h4>
          <div className="flex flex-col space-y-2.5 text-sm font-inter text-slate-700">
            <a
              href="mailto:contact@egostix.com"
              className="hover:text-blue-600 transition-colors duration-150 w-fit font-mono text-xs"
            >
              contact@egostix.com
            </a>
            <a
              href="tel:+917319274817"
              className="hover:text-blue-600 transition-colors duration-150 w-fit font-mono text-xs"
            >
              +91 73192 74817
            </a>
            <p className="text-slate-600 text-xs leading-relaxed pt-1">
              Badkulla, Nadia, West Bengal, India - 741121
            </p>
            <div className="pt-2">
              <InteractiveInquiryButton label="Send an Inquiry" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-neutral-200 mt-8 pt-6 px-4 tablet:px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-inter">
        <div>
          © {new Date().getFullYear()} Egostix Engineering Pvt. Ltd. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-[10px] uppercase text-slate-400">
            An Egostix Engineering Company
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <Link
            href="/privacy"
            className="hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-blue-600 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

