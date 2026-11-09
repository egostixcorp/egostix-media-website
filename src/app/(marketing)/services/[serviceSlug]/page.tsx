import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Target,
  AlertCircle,
  Cpu,
  Layers,
  HelpCircle,
  Sparkles,
  ChevronRight,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { services, getServiceBySlug } from "@/data/servicesData";
import { getProjectBySlug } from "@/data/work";
import JsonLd from "@/components/global/JsonLd";

interface ServicePageProps {
  params: {
    serviceSlug: string;
  };
}

export async function generateStaticParams() {
  const paths: { serviceSlug: string }[] = [];
  services.forEach((s) => {
    paths.push({ serviceSlug: s.slug });
    if (s.aliases) {
      s.aliases.forEach((alias) => paths.push({ serviceSlug: alias }));
    }
  });
  return paths;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.serviceSlug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const canonicalUrl = `https://media.egostix.com/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "Egostix Media",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      creator: "@egostix",
    },
  };
}

export default function DedicatedServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.serviceSlug);

  if (!service) {
    notFound();
  }

  const canonicalUrl = `https://media.egostix.com/services/${service.slug}`;

  // Structured Data (Service + FAQPage + BreadcrumbList)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: service.title,
    serviceType: service.shortTitle,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Egostix Media",
      url: "https://media.egostix.com",
    },
    areaServed: "Global",
    offers: {
      "@type": "Offer",
      price: service.pricing?.usd?.split("–")[0]?.replace(/[^0-9]/g, "") || "2500",
      priceCurrency: "USD",
      description: service.pricing?.scope,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.deliverables.map((item: string, idx: number) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
        position: idx + 1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://media.egostix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://media.egostix.com/service",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://media.egostix.com/services/${service.slug}`,
      },
    ],
  };

  // Load related case studies
  const relatedProjects = (service.relatedCaseStudies || [])
    .map((slug: string) => getProjectBySlug(slug))
    .filter(Boolean);

  return (
    <main className="w-full px-6 py-24 bg-white text-slate-900">
      <JsonLd data={serviceSchema} />
      {service.faqs?.length > 0 && <JsonLd data={faqSchema} />}
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-5xl space-y-20 pt-8">
        {/* Navigation Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono text-slate-500"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <Link href="/service" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="space-y-6 border-b border-neutral-200 pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
              System {service.index}
            </span>
            <span className="font-mono text-xs text-slate-500 flex items-center gap-1">
              <Clock className="size-3.5 text-blue-600" />
              <span>Typical Delivery: {service.timeline}</span>
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-mono font-bold tracking-tight tablet:text-4xl laptop:text-5xl text-slate-900 leading-tight">
            {service.title}
          </h1>

          <p className="max-w-3xl text-lg font-inter text-slate-700 leading-relaxed font-normal">
            {service.tagline}
          </p>

          <p className="max-w-3xl text-sm font-inter text-slate-600 leading-relaxed">
            {service.description}
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href={`/contact?system=${service.contactAnchor}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-mono text-xs font-bold text-white transition hover:bg-blue-800 shadow-xs"
            >
              <span>Scope This System</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded border border-neutral-300 bg-white px-6 py-3 font-mono text-xs font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-700 transition"
            >
              View Scope & Pricing
            </Link>
          </div>
        </section>

        {/* Key Measurable Outcomes */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
              Measurable Impact
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
              Outcomes Engineered Into The System
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.outcomes.map((outcome: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 transition hover:border-blue-300"
              >
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <span className="text-sm font-inter text-slate-800 font-medium">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Problems Solved (The Real Cost of Legacy Methods) */}
        <section className="space-y-6 rounded-xl border border-red-200/80 bg-red-50/30 p-6 tablet:p-8">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold flex items-center gap-1.5">
              <AlertCircle className="size-4 text-red-600" />
              <span>The Bottleneck</span>
            </p>
            <h2 className="text-xl font-mono font-bold text-slate-900">
              Why Current Workarounds Are Costing You Growth
            </h2>
          </div>

          <div className="space-y-3">
            {service.coreProblemsSolved.map((prob: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 text-sm font-inter text-slate-700">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-500" />
                <span>{prob}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Target Audience (Who This Is Engineered For) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
              Customer Profiles
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
              Who We Built This System For
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {service.targetAudience.map(
              (target: { profile: string; need: string }, idx: number) => (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-300 bg-white p-5 space-y-3 flex flex-col justify-between hover:border-blue-600 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="size-4 text-blue-600 shrink-0" />
                      <h3 className="font-mono text-sm font-bold text-slate-900">
                        {target.profile}
                      </h3>
                    </div>
                    <p className="text-xs font-inter leading-relaxed text-slate-600">
                      {target.need}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 font-semibold uppercase">
                    High-Fit Profile
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        {/* Deliverables & Architecture */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
              Technical Deliverables
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
              Production Specifications & Architecture
            </h2>
          </div>

          <div className="rounded-lg border border-neutral-300 bg-white p-6 space-y-4">
            <ul className="space-y-3">
              {service.deliverables.map((del: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm font-inter text-slate-800"
                >
                  <div className="mt-1 flex size-4 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-700">
                    <span className="font-mono text-[10px] font-bold">{idx + 1}</span>
                  </div>
                  <span>{del}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-slate-500 mr-2">
                Core Stack:
              </span>
              {service.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing & Typical Scope Anchoring */}
        <section
          id="pricing"
          className="space-y-6 rounded-xl border border-neutral-300 bg-neutral-50/70 p-6 tablet:p-8"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold flex items-center gap-1.5">
              <DollarSign className="size-4 text-blue-600" />
              <span>Investment & Timeline Parameters</span>
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
              Transparent Project Scoping
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 pt-2">
            <div className="space-y-2 border-l-2 border-blue-600 pl-4">
              <p className="font-mono text-xs uppercase text-slate-500 font-semibold">
                International (USD)
              </p>
              <p className="font-mono text-2xl font-bold text-slate-900">
                {service.pricing.usd}
              </p>
              <p className="text-xs font-inter text-slate-600">
                For US, UK, EU, and global scaleups requiring fast delivery.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-blue-600 pl-4">
              <p className="font-mono text-xs uppercase text-slate-500 font-semibold">
                Regional (INR)
              </p>
              <p className="font-mono text-2xl font-bold text-slate-900">
                {service.pricing.inr}
              </p>
              <p className="text-xs font-inter text-slate-600">
                For established Indian SMBs, private clinics, and local enterprises.
              </p>
            </div>
          </div>

          <div className="rounded bg-white p-4 border border-neutral-200 text-xs font-inter text-slate-700">
            <strong>Scope Parameters:</strong> {service.pricing.scope} Typical turnaround is{" "}
            <strong>{service.timeline}</strong> with functional review prototypes by the end of Week 1.
          </div>
        </section>

        {/* Relevant Case Studies */}
        {relatedProjects.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
                Proof of Execution
              </p>
              <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
                Related Systems We Shipped
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProjects.map((proj: any) => (
                <article
                  key={proj.slug}
                  className="rounded-lg border border-neutral-300 bg-white p-6 space-y-4 hover:border-blue-600 transition flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>{proj.client}</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-slate-900">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-inter text-slate-600 leading-relaxed line-clamp-3">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div className="font-mono text-xs font-bold text-slate-900">
                      {proj.metrics && proj.metrics[0]?.value}{" "}
                      <span className="text-[10px] font-normal text-slate-500">
                        {proj.metrics && proj.metrics[0]?.label}
                      </span>
                    </div>
                    <Link
                      href={`/work/${proj.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                    >
                      <span>Case study</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Service FAQs */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
              FAQ
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map(
              (faq: { question: string; answer: string }, idx: number) => (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-5 space-y-2"
                >
                  <h3 className="font-mono text-sm font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="text-xs font-inter leading-relaxed text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Bottom Conversion CTA */}
        <section className="rounded-xl border border-neutral-300 bg-neutral-900 text-white p-8 tablet:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-wider font-semibold">
                Start Discovery
              </span>
              <h2 className="text-2xl font-mono font-bold tablet:text-3xl">
                Ready to build {service.shortTitle}?
              </h2>
              <p className="max-w-2xl text-xs tablet:text-sm font-inter text-neutral-300 leading-relaxed">
                Send us your actual operational bottleneck or desired software requirements.
                We return with an architectural proposal and functional prototype schedule within 48 hours.
              </p>
            </div>

            <Link
              href={`/contact?system=${service.contactAnchor}`}
              className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3.5 font-mono text-xs font-bold text-white transition hover:bg-blue-500 whitespace-nowrap"
            >
              Contact Engineer &rarr;
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

