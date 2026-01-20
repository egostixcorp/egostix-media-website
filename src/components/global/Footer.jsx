import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white px-6 pt-5">
      <div className="mx-auto pb-5 max-w-6xl grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-3">
          <h3 className="font-mono text-lg font-semibold">
            <span className="text-blue-600">Egostix</span>{" "}
            <span className="font-light font-inter">Media</span>
          </h3>
          <p className="text-sm font-inter text-neutral-600 leading-relaxed">
            A results-driven media and intelligence studio. We combine
            creativity, engineering, and AI to ship measurable outcomes — not
            campaigns.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold text-neutral-800">
            Company
          </h4>
          <ul className="space-y-2 text-sm font-inter text-neutral-600">
            <li>
              <Link href="/about" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link href="/approach" className="hover:text-black">
                Approach
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold text-neutral-800">
            Contact
          </h4>
          <div className="text-sm font-inter text-neutral-600 space-y-1">
            <p>contact@egostix.com</p>
            <p>+91 73192 74817</p>
            <p className="text-xs text-neutral-500">
              Badkulla, West Bengal, India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className=" border-t h-10 resd  text-center flex items-center justify-center text-xs font-inter text-neutral-500">
        © {new Date().getFullYear()} Egostix Engineering Pvt. Ltd. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
