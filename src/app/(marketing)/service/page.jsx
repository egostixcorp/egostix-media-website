import Link from "next/link";
import React from "react";

const services = [
  {
    title: "AI-Powered Business Websites",
    description:
      "Modern websites designed as business systems instead of static pages.",
    outcomes: [
      "Lead generation infrastructure",
      "AI chat and booking integrations",
      "CRM, analytics, SEO, and content systems",
    ],
  },
  {
    title: "AI Internal Tools for SMBs",
    description:
      "Custom operational software that removes slow manual work from growing teams.",
    outcomes: [
      "Dashboards and reporting systems",
      "Workflow, inventory, and admin tools",
      "Client portals and business automation",
    ],
  },
  {
    title: "Creator Infrastructure",
    description:
      "AI-powered systems for creators, personal brands, and digital-first communities.",
    outcomes: [
      "Creator websites and subscription platforms",
      "Digital product and community systems",
      "AI content systems and automation workflows",
    ],
  },
  {
    title: "AI Workflow Automation",
    description:
      "Operational automation systems that connect communication, support, sales, and reporting.",
    outcomes: [
      "WhatsApp, email, and appointment workflows",
      "AI customer support and lead qualification",
      "CRM automation and reporting loops",
    ],
  },
];

const ServicePage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Services
          </p>
          <h1 className="max-w-4xl text-3xl tablet:text-4xl laptop:text-6xl font-mono tracking-tight">
            We build AI-native business systems for teams that need to move
            faster.
          </h1>
          <p className="max-w-3xl text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Egostix Media combines creativity, engineering, and intelligence to
            turn websites, tools, creator platforms, and workflows into systems
            that improve operations and customer acquisition.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded border border-neutral-300 bg-white p-6"
            >
              <div className="space-y-3">
                <h2 className="text-xl tablet:text-2xl font-mono text-neutral-900">
                  {service.title}
                </h2>
                <p className="text-sm font-inter text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-sm font-inter text-neutral-700">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="border-t pt-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl tablet:text-3xl font-mono">
                Discover → Prototype → Integrate → Scale
              </h2>
              <p className="max-w-3xl text-sm font-inter text-neutral-600 leading-relaxed">
                We start with the real operational problem, build fast proof,
                connect it to the business environment, then improve the system
                with live feedback.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-mono text-white transition hover:bg-blue-700"
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
