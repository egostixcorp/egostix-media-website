import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, Cpu } from "lucide-react";
import JsonLd from "@/components/global/JsonLd";

export const metadata = {
  title: "About Us & Engineering Foundations | Egostix Media",
  description:
    "Egostix Media is an AI-native productized software studio operating under Egostix Engineering. Discover our philosophy, standards, and delivery model.",
  alternates: {
    canonical: "https://media.egostix.com/about",
  },
  openGraph: {
    title: "About Us & Engineering Foundations | Egostix Media",
    description:
      "Egostix Media is an AI-native productized software studio operating under Egostix Engineering. Discover our philosophy, standards, and delivery model.",
    url: "https://media.egostix.com/about",
    type: "website",
  },
};

const principles = [
  {
    title: "Systems, Not Campaigns",
    body: "We do not build static digital brochures or one-off marketing stunts that decay the month after launch. We engineer integrated frameworks—combining responsive Next.js frontend code, Supabase data schemas, and conversational AI—that scale and evolve with your business.",
  },
  {
    title: "Outcomes Over Output",
    body: "Lines of code and design deliverables are meaningless unless real operational metrics move in your business. We measure success by concrete outcomes: inquiries converted, repetitive manual hours automated, sub-second edge speeds, and measurable revenue growth.",
  },
  {
    title: "Intelligence Compounds",
    body: "The best business systems get faster and smarter with active usage. We design automated feedback loops, CRM webhook synchronizations, and analytics telemetry into every system from Day 1 so your operations compound in velocity over time.",
  },
];

const capabilities = [
  {
    title: "Productized Sprint Execution",
    description: "Traditional agencies bill endless hourly retainers with vague deliverables. We work in disciplined 7-day sprints with functional prototypes in Week 1 and production deployment in 2–4 weeks.",
  },
  {
    title: "Full-Stack System Ownership",
    description: "You own 100% of your codebase, data models, and API configurations. We build on modern standards (Next.js, Supabase, PostgreSQL) with zero proprietary vendor lock-in.",
  },
  {
    title: "AI-Native Engineering Workflows",
    description: "We use AI-assisted engineering systems internally to compress build times from months to weeks, passing speed, cost efficiency, and higher architectural rigor directly to our clients.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Egostix Media",
  description:
    "Company overview, engineering principles, and operating model of Egostix Media, an Egostix Engineering Pvt. Ltd. studio.",
  url: "https://media.egostix.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Egostix Media",
    legalName: "Egostix Engineering Pvt. Ltd.",
    parentOrganization: {
      "@type": "Organization",
      name: "Egostix Engineering Pvt. Ltd.",
    },
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Badkulla",
      addressLocality: "Nadia",
      addressRegion: "West Bengal",
      postalCode: "741121",
      addressCountry: "IN",
    },
  },
};

const AboutPage = () => {
  return (
    <main className="w-full px-6 py-24 bg-white text-slate-900">
      <JsonLd data={aboutPageSchema} />
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Header Section */}
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
            Studio Background
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-slate-900 leading-tight">
            Egostix Media builds systems where creativity, engineering, and intelligence meet.
          </h1>
          <p className="max-w-3xl text-sm tablet:text-base font-inter leading-relaxed text-slate-700">
            Egostix Media is an AI-native productized software and media studio operating under <strong>Egostix Engineering Pvt. Ltd. (2026)</strong>. We help modern businesses, private clinics, creators, and scaleups move faster through rapid software development, workflow automation, and robust digital infrastructure.
          </p>
        </section>

        {/* Why Egostix Media Exists */}
        <section className="grid gap-10 border-t border-neutral-200 pt-12 md:grid-cols-[0.8fr_1fr]">
          <div className="space-y-3">
            <h2 className="text-2xl font-mono font-bold tracking-tight tablet:text-3xl text-slate-900">
              Why Egostix Media Exists
            </h2>
            <p className="font-mono text-xs text-blue-600 uppercase tracking-wider font-semibold">
              The Problem with Outdated Systems
            </p>
          </div>

          <div className="space-y-5 text-sm font-inter leading-relaxed text-slate-700 tablet:text-base">
            <p>
              Most businesses operate using fragmented tools, manual spreadsheets, and slow digital infrastructure. Meanwhile, AI has permanently transformed how high-performance software, content platforms, and automation workflows can be engineered.
            </p>
            <p>
              Traditional development agencies are slow, expensive, and rely on manual labor that stretches basic websites into 6-month projects. Egostix Media exists to replace that inefficiency: we combine productized software engineering with AI-assisted workflows to deliver production-grade systems in 2 to 4 weeks.
            </p>
            <p>
              The companies that thrive in the coming decade will not necessarily be the largest companies—they will be the fastest-moving companies with the best systems, automated follow-ups, and adaptive infrastructure. We build those systems.
            </p>
          </div>
        </section>

        {/* Three Core Principles */}
        <section className="space-y-6 border-t border-neutral-200 pt-12">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
              Foundational Values
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900">
              The Three Pillars of Our Engineering
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-lg border border-neutral-300 bg-white p-6 space-y-3 hover:border-blue-600 transition"
              >
                <h3 className="font-mono text-lg text-blue-700 font-bold">
                  {principle.title}
                </h3>
                <p className="text-sm font-inter leading-relaxed text-slate-600">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Studio Delivery Capabilities */}
        <section className="space-y-6 border-t border-neutral-200 pt-12">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
              Delivery Standards
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900">
              How We Execute Differently
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 bg-neutral-50/60 p-6 space-y-3"
              >
                <div className="flex size-8 items-center justify-center rounded bg-blue-100 text-blue-700 font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-mono text-base font-bold text-slate-900">
                  {cap.title}
                </h3>
                <p className="text-xs font-inter leading-relaxed text-slate-600">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate Coordinates & Parent Organization */}
        <section className="rounded-xl border border-neutral-300 bg-neutral-50 p-8 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
              Parent Entity & Studio Coordinates
            </span>
            <h3 className="font-mono text-xl font-bold text-slate-900">
              Egostix Engineering Pvt. Ltd.
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3 font-mono text-xs text-slate-700 pt-2 border-t border-neutral-200">
            <div>
              <p className="text-slate-400 uppercase font-semibold mb-1">Corporate HQ</p>
              <p className="text-slate-900 font-medium">Badkulla, Nadia</p>
              <p className="text-slate-600">West Bengal, India - 741121</p>
            </div>

            <div>
              <p className="text-slate-400 uppercase font-semibold mb-1">Direct Communication</p>
              <a href="mailto:contact@egostix.com" className="text-blue-600 hover:underline block">
                contact@egostix.com
              </a>
              <a href="tel:+917319274817" className="text-blue-600 hover:underline block mt-0.5">
                +91 73192 74817
              </a>
            </div>

            <div>
              <p className="text-slate-400 uppercase font-semibold mb-1">Global Coverage</p>
              <p className="text-slate-900 font-medium">Remote & Distributed</p>
              <p className="text-slate-600">Serving clients across US, UK, EU & India</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral-200 pt-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-mono font-bold text-slate-900">
                Let&apos;s build your next system.
              </h2>
              <p className="text-sm font-inter text-slate-600">
                Explore our service catalog or schedule an introductory discovery conversation with an engineer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/service"
                className="inline-flex items-center justify-center rounded border border-neutral-300 bg-white px-5 py-3 font-mono text-xs font-semibold text-slate-800 hover:border-blue-600 transition"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded bg-blue-700 px-5 py-3 font-mono text-xs font-bold text-white hover:bg-blue-800 transition"
              >
                Contact Engineers &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
