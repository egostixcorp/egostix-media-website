"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Layers,
  Briefcase,
  Mail,
  ArrowRight,
  Terminal,
  Search,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

const quickLinks = [
  {
    title: "Home Base",
    description: "Return to the main Egostix Media landing station.",
    href: "/",
    icon: Home,
    badge: "MAIN_NODE",
  },
  {
    title: "AI Services & Solutions",
    description: "Explore our AI websites, internal tools, and automation.",
    href: "/service",
    icon: Layers,
    badge: "SOLUTIONS",
  },
  {
    title: "Our Work & Portfolio",
    description: "Inspect our case studies, products, and media engineering.",
    href: "/work",
    icon: Briefcase,
    badge: "CASE_STUDIES",
  },
  {
    title: "Contact & Inquiry",
    description: "Direct line to Egostix Engineering team & project quotes.",
    href: "/contact",
    icon: Mail,
    badge: "SUPPORT",
  },
];

export default function NotFoundContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = quickLinks.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-white py-16 tablet:py-24 px-4 tablet:px-[10%] laptop:px-[15%] flex flex-col justify-center items-center">
      {/* Background Decorative Tech Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-700 font-mono text-xs font-semibold mb-6 shadow-xs backdrop-blur-xs">
          <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
          <span>[ STATUS: 404 // SIGNAL_LOST ]</span>
        </div>

        {/* Hero 404 Display */}
        <div className="relative select-none my-2">
          <span className="text-8xl sm:text-9xl md:text-[11rem] font-mono font-extrabold tracking-tighter text-slate-900/10 block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl md:text-8xl font-mono font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 bg-clip-text text-transparent drop-shadow-sm">
              404
            </span>
          </div>
        </div>

        {/* Main Headline & Description */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter text-slate-900 tracking-tight mb-3">
          Quantum Coordinates Not Found
        </h1>
        <p className="text-sm sm:text-base font-inter text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          The node or route you requested does not exist or has been relocated within the{" "}
          <span className="font-mono font-semibold text-slate-800">Egostix Media</span> network.
        </p>

        {/* Live System Diagnostics Box */}
        <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-slate-900 text-slate-100 p-4 font-mono text-xs text-left mb-10 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="size-4 text-blue-400" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-300">
                EGOSTIX_AI_STATION // TELEMETRY
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-500" />
              <span className="size-2 rounded-full bg-yellow-500" />
              <span className="size-2 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="space-y-1.5 text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-3.5 text-amber-400 shrink-0" />
              <span className="text-amber-300">[ERR_UNRESOLVED_ROUTE]:</span>
              <span className="text-slate-400 truncate">HTTP 404 Resource Missing</span>
            </div>
            <p className="text-slate-400 pl-5 text-[11px]">
              Engine: <span className="text-blue-300">Egostix Next.js Router v14</span>
            </p>
            <p className="text-slate-400 pl-5 text-[11px]">
              Action: <span className="text-green-400 font-semibold">Select valid node below to reconnect</span>
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-mono text-xs font-bold text-white transition-all duration-200 hover:bg-blue-800 shadow-md active:scale-95"
          >
            <Home className="size-4" />
            <span>Return to Home Base</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded border border-neutral-300 bg-white px-5 py-3 font-mono text-xs font-semibold text-slate-700 hover:bg-neutral-50 transition-all duration-200 shadow-2xs hover:border-slate-400"
          >
            <Mail className="size-4 text-blue-700" />
            <span>Report Broken Link</span>
          </Link>
        </div>

        {/* Interactive Quick Search Filter */}
        <div className="w-full max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination nodes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-neutral-200 bg-white font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Navigation Grid (4 Core Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group relative rounded-lg border border-neutral-200 bg-white p-5 transition-all duration-200 hover:border-blue-500/50 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex size-10 items-center justify-center rounded-md border border-blue-100 bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors duration-200">
                        <IconComponent className="size-5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-mono text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <ChevronRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-blue-600" />
                    </h3>
                    <p className="font-inter text-xs text-slate-600 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center font-mono text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
              No destination nodes matched &quot;{searchTerm}&quot;. Try another search term.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
