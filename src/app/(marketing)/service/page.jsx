import Link from "next/link";
import React from "react";
import { services } from "@/data/servicesData";
import { ArrowRight, Sparkles } from "lucide-react";
import JsonLd from "@/components/global/JsonLd";

export const metadata = {
  title: "Services & Systems Architecture | Egostix Media",
  description:
    "Explore our 4 AI-native production systems: AI Business Websites, Custom Internal Tools, Creator Infrastructure, and Workflow Automation. Shipped in 2–4 weeks.",
  alternates: {
    canonical: "https://media.egostix.com/service",
  },
  openGraph: {
    title: "Services & Systems Architecture | Egostix Media",
    description:
      "Explore our 4 AI-native production systems: AI Business Websites, Custom Internal Tools, Creator Infrastructure, and Workflow Automation. Shipped in 2–4 weeks.",
    url: "https://media.egostix.com/service",
    type: "website",
  },
};

const methodologySteps = [
  {
    step: "01",
    title: "Discover",
    body: "We audit real operational bottlenecks, manual workloads, and data pipelines to identify high-ROI targets.",
  },
  {
    step: "02",
    title: "Prototype",
    body: "Engineers build a functional proof-of-concept system within 7–14 days for immediate feedback and testing.",
  },
  {
    step: "03",
    title: "Integrate",
    body: "We deploy the software directly into your live business environment (CRMs, messaging channels, databases).",
  },
  {
    step: "04",
    title: "Scale",
    body: "Continuous system telemetry, analytics, and iterative improvements to maximize operational velocity.",
  },
];

const serviceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: s.title,
    url: `https://media.egostix.com/services/${s.slug}`,
    description: s.description,
  })),
};

const ServicePage = () => {
  return (
    <main className="w-full px-6 py-24 bg-white text-slate-900">
      <JsonLd data={serviceCatalogSchema} />
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Header Section */}
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
            Services Catalog
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-slate-900 leading-tight">
            We build AI-native business systems for teams that need to move faster.
          </h1>
          <p className="max-w-3xl text-sm tablet:text-base font-inter text-slate-600 leading-relaxed">
            Egostix Media combines creativity, engineering, and intelligence to turn websites, internal tools, creator platforms, and workflows into reliable software that improves customer acquisition and saves operational hours.
          </p>
        </section>

        {/* Service Cards Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.contactAnchor}
              className="flex flex-col justify-between rounded-lg border border-neutral-300 bg-white p-6 tablet:p-8 transition-all duration-200 hover:border-blue-600 hover:shadow-xs"
            >
              <div className="space-y-5">
                {/* Card Title & Index Header */}
                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      System {service.index}
                    </span>
                    <h2 className="text-xl tablet:text-2xl font-mono text-slate-900 font-bold mt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </h2>
                  </div>
                </div>

                <p className="text-sm font-inter text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Outcomes */}
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Core Outcomes
                  </p>
                  <ul className="space-y-2 text-xs tablet:text-sm font-inter text-slate-700">
                    {service.outcomes.slice(0, 3).map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-600" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    Engineering Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline & Ideal Target */}
                <div className="pt-2 font-mono text-xs text-slate-500 border-t border-neutral-100 flex flex-col gap-1">
                  <div>
                    <span className="font-semibold text-slate-700">Turnaround:</span> {service.timeline}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-slate-700">Target:</span> {service.idealFor}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions / CTAs */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-700 hover:text-blue-800 transition"
                >
                  <span>Explore Specs & Pricing</span>
                  <ArrowRight className="size-3.5" />
                </Link>

                <Link
                  href={`/contact?system=${service.contactAnchor}`}
                  className="inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 font-mono text-xs font-semibold text-white transition hover:bg-blue-800"
                >
                  Scope System &rarr;
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Methodology Deployment Process */}
        <section className="space-y-6 border-t border-neutral-200 pt-12">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
              Deployment Operating Model
            </p>
            <h2 className="text-2xl tablet:text-3xl font-mono text-slate-900 font-bold">
              Discover &rarr; Prototype &rarr; Integrate &rarr; Scale
            </h2>
            <p className="text-sm font-inter text-slate-600 leading-relaxed">
              We start with the actual operational bottleneck, build functional proof in 7–14 days, connect it directly into your live environment, then optimize with telemetry and user feedback.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 pt-4">
            {methodologySteps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-neutral-300 bg-white p-6"
              >
                <div className="flex size-10 items-center justify-center rounded bg-blue-50 font-mono text-base font-semibold text-blue-700">
                  {step.step}
                </div>
                <h3 className="mt-4 font-mono text-lg text-slate-900 font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs tablet:text-sm font-inter leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom Call To Action (CTA) Section */}
        <section className="border-t border-neutral-200 pt-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl tablet:text-3xl font-mono tracking-tight text-slate-900 font-bold">
                Ready to engineer your business system?
              </h2>
              <p className="max-w-3xl text-sm font-inter text-slate-600 leading-relaxed">
                Whether you need a high-converting website, custom internal tools, a creator platform, or WhatsApp automation, we build functional prototypes in weeks.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-blue-700 px-6 py-3.5 font-mono text-xs font-bold text-white transition hover:bg-blue-800 shadow-xs"
            >
              Contact Us to Begin
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServicePage;
