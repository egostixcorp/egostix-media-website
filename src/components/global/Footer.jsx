import React from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Service", href: "/service" },
  { label: "Approach", href: "/approach" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white px-6 pt-10">
      <div className="mx-auto grid max-w-6xl gap-10 pb-10 md:grid-cols-3">
        <div className="space-y-3">
          <h3 className="font-mono text-lg font-semibold">
            <span className="text-blue-600">Egostix</span>{" "}
            <span className="font-light font-inter">Media</span>
          </h3>
          <p className="text-sm font-inter leading-relaxed text-neutral-600">
            An AI-native media and software studio building systems that turn
            creativity, engineering, and intelligence into measurable outcomes.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold text-neutral-800">
            Company
          </h4>
          <ul className="space-y-2 text-sm font-inter text-neutral-600">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold text-neutral-800">
            Contact
          </h4>
          <div className="space-y-1 text-sm font-inter text-neutral-600">
            <p>contact@egostix.com</p>
            <p>+91 73192 74817</p>
            <p className="text-xs text-neutral-500">
              Badkulla, West Bengal, India
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-10 items-center justify-center border-t border-neutral-200 text-center text-xs font-inter text-neutral-500">
        © {new Date().getFullYear()} Egostix Engineering Pvt. Ltd. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
