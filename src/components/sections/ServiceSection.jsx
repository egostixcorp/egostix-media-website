import React from "react";
import Link from "next/link";

const services = [
  {
    title: "AI-Powered Business Websites",
    description: "Modern websites engineered as business systems rather than static pages. Features integrated lead capture, CRM synchronization, automated scheduling, and built-in SEO pipelines.",
    link: "/service#websites",
  },
  {
    title: "AI Internal Tools for SMBs",
    description: "Tailored operational software designed to automate manual labor. Includes admin panels, inventory trackers, secure customer portals, and real-time activity dashboards.",
    link: "/service#tools",
  },
  {
    title: "Creator Infrastructure",
    description: "Dedicated digital architecture for personal brands and digital creators. Features subscription portals, digital product delivery engines, and automated content publishing loops.",
    link: "/service#creator",
  },
  {
    title: "AI Workflow Automation",
    description: "Operational efficiency engines linking messaging platforms to internal databases. Features automated WhatsApp notifications, customer support agents, and lead triage pipelines.",
    link: "/service#automation",
  },
];

const ServiceSection = () => {
  return (
    <section id="services" className="w-full border-t border-neutral-200 px-6 py-24 bg-white" aria-labelledby="services-heading">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-700">
            Offerings
          </p>
          <h2 id="services-heading" className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900">
            Systems designed to drive operational velocity.
          </h2>
          <p className="text-sm max-w-3xl font-inter leading-relaxed text-slate-700 tablet:text-base">
            We build modular, repeatable infrastructure for small businesses, clinics, creators, and startups.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={i}
              className="group flex flex-col justify-between rounded border border-neutral-300 bg-white p-6 transition-all duration-200 hover:border-blue-700"
            >
              <div className="space-y-4">
                <h3 className="font-mono text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm font-inter leading-relaxed text-slate-700">
                  {service.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={service.link}
                  className="inline-flex items-center text-xs font-mono font-semibold text-blue-700 hover:text-blue-800"
                >
                  Learn more <span className="ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
