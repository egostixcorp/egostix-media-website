import Link from "next/link";
import React from "react";
import { services } from "@/data/servicesData";

export const metadata = {
  title: "Services & Systems | Egostix Media",
  description:
    "Explore our 4 AI-native service offerings: AI-Powered Business Websites, AI Internal Tools, Workflow Automation, and Creator Infrastructure.",
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

const ServicePage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Header Section */}
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Services
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-neutral-900">
            We build AI-native business systems for teams that need to move faster.
          </h1>
          <p className="max-w-3xl text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Egostix Media combines creativity, engineering, and intelligence to turn websites, tools, creator platforms, and workflows into systems that improve operations and customer acquisition.
          </p>
        </section>

        {/* Service Cards Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.contactAnchor}
              className="flex flex-col justify-between rounded border border-neutral-300 bg-white p-6 transition-all duration-200 hover:border-blue-600"
            >
              <div className="space-y-5">
                {/* Card Title & Index Header */}
                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-3">
                  <h2 className="text-xl tablet:text-2xl font-mono text-neutral-900">
                    {service.title}
                  </h2>
                  <span className="font-mono text-xs font-semibold text-neutral-400 shrink-0">
                    [ SYSTEM {service.index} ]
                  </span>
                </div>

                <p className="text-sm font-inter text-neutral-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Outcomes */}
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-[11px] font-semibold uppercase text-neutral-400 tracking-wider">
                    Key Outcomes
                  </p>
                  <ul className="space-y-2 text-sm font-inter text-neutral-700">
                    {service.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-[11px] font-semibold uppercase text-neutral-400 tracking-wider">
                    Engineering Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] text-neutral-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline & Ideal Target */}
                <div className="pt-2 font-mono text-xs text-neutral-500 border-t border-neutral-100 flex flex-col gap-1">
                  <div>
                    <span className="font-semibold text-neutral-700">Timeline:</span> {service.timeline}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-neutral-700">Target:</span> {service.idealFor}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions / CTAs */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                <Link
                  href={`/contact?system=${service.contactAnchor}`}
                  className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 font-mono text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  Build this system &rarr;
                </Link>

                <Link
                  href={`/contact?system=${service.contactAnchor}`}
                  className="inline-flex items-center text-xs font-mono font-semibold text-blue-600 hover:text-blue-700"
                >
                  Contact engineer &rarr;
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Methodology Deployment Process */}
        <section className="space-y-6 border-t border-neutral-200 pt-12">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
              Process
            </p>
            <h2 className="text-2xl tablet:text-3xl font-mono text-neutral-900">
              Discover &rarr; Prototype &rarr; Integrate &rarr; Scale
            </h2>
            <p className="text-sm font-inter text-neutral-600 leading-relaxed">
              We start with the real operational problem, build fast proof, connect it to the business environment, then improve the system with live feedback.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 pt-4">
            {methodologySteps.map((step) => (
              <article
                key={step.title}
                className="rounded border border-neutral-300 bg-white p-6"
              >
                <div className="flex size-10 items-center justify-center rounded bg-blue-50 font-mono text-base font-semibold text-blue-600">
                  {step.step}
                </div>
                <h3 className="mt-4 font-mono text-lg text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs tablet:text-sm font-inter leading-relaxed text-neutral-600">
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
              <h2 className="text-2xl tablet:text-3xl font-mono tracking-tight text-neutral-900">
                Ready to build your system?
              </h2>
              <p className="max-w-3xl text-sm font-inter text-neutral-600 leading-relaxed">
                Let&apos;s discuss how we can automate your operations, launch your custom creator platform, or build internal intelligence tooling. We deliver functional prototypes in weeks.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 font-mono text-sm font-mono text-white transition hover:bg-blue-700"
            >
              Contact us to begin
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServicePage;


