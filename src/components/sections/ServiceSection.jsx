import React from "react";
import Link from "next/link";
import { services } from "@/data/servicesData";
import { ArrowRight } from "lucide-react";

const ServiceSection = () => {
  return (
    <section
      id="services"
      className="w-full border-t border-neutral-200 px-6 py-24 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Offerings
          </p>
          <h2
            id="services-heading"
            className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900"
          >
            Systems designed to drive operational velocity.
          </h2>
          <p className="text-sm max-w-3xl font-inter leading-relaxed text-slate-700 tablet:text-base">
            We build modular, repeatable software and digital infrastructure for small businesses, clinics, creators, and startups.
          </p>
        </div>

        {/* Lightweight Mobile-Responsive Service Preview Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col justify-between rounded border border-neutral-300 bg-white p-6 transition-all duration-200 hover:border-blue-600"
            >
              <div className="space-y-4">
                {/* Header Row: Title & System Index */}
                <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-3">
                  <h3 className="font-mono text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-slate-400 shrink-0">
                    [ SYSTEM {service.index} ]
                  </span>
                </div>

                <p className="text-sm font-inter leading-relaxed text-slate-700">
                  {service.description}
                </p>

                {/* Subtle Meta Summary */}
                <div className="pt-2 font-mono text-xs text-slate-500 border-t border-neutral-100 flex items-center justify-between">
                  <span>Timeline: {service.timeline}</span>
                  <span className="text-blue-600 font-medium">Explore Specs &rarr;</span>
                </div>
              </div>

              {/* Action Link to Dedicated Service Page */}
              <div className="mt-6 pt-3 border-t border-neutral-100">
                <Link
                  href={`/service#${service.contactAnchor}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
                >
                  Explore Service Specifications
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Guide to Dedicated Service Page */}
        <div className="border-t border-neutral-200 pt-10 mt-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-2">
              <h3 className="text-xl font-mono tracking-tight tablet:text-2xl text-slate-900">
                Need full system details and technology stacks?
              </h3>
              <p className="max-w-2xl text-sm font-inter text-slate-600 leading-relaxed">
                View our complete service catalog, key deliverables, timelines, and deployment methodology on our dedicated Service page.
              </p>
            </div>

            <Link
              href="/service"
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-3 font-mono text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Service Page
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;



