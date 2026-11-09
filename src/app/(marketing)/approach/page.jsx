import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Layers, Sparkles } from "lucide-react";
import JsonLd from "@/components/global/JsonLd";

export const metadata = {
  title: "Our Approach — Discover, Prototype, Integrate, Scale | Egostix Media",
  description:
    "How we turn complex business problems into reliable operational software in weeks without burying execution under agency process.",
  alternates: {
    canonical: "https://media.egostix.com/approach",
  },
  openGraph: {
    title: "Our Approach — Discover, Prototype, Integrate, Scale | Egostix Media",
    description:
      "How we turn complex business problems into reliable operational software in weeks without burying execution under agency process.",
    url: "https://media.egostix.com/approach",
    type: "website",
  },
};

const steps = [
  {
    step: "01",
    title: "Discover",
    timeframe: "Days 1 – 3",
    deliverable: "System Architecture Scope & User Journey Map",
    body: "We audit your actual operational bottlenecks, manual workloads, and data pipelines. Rather than writing a 40-page theoretical document, we isolate the highest-impact problem and define strict measurable targets before writing code.",
    checklist: [
      "Process friction and manual workload audit",
      "Data schema and API integration inventory",
      "Quantifiable KPI targets and sprint milestone schedule",
    ],
  },
  {
    step: "02",
    title: "Prototype",
    timeframe: "Days 4 – 10",
    deliverable: "Clickable Interactive System Demo",
    body: "Our engineers build a functional proof-of-concept system within 7–10 days. Assumptions are validated against real screen flows and actual business data so you can test the UI before full deployment.",
    checklist: [
      "Next.js responsive interactive application",
      "Conversational AI prompts and database schema setup",
      "Stakeholder feedback review and scope lock",
    ],
  },
  {
    step: "03",
    title: "Integrate",
    timeframe: "Days 11 – 18",
    deliverable: "Live Staging Deployment & Webhook Sync",
    body: "We wire the software directly into your live business environment. Webhooks connect to CRMs (HubSpot, Supabase), messaging platforms (WhatsApp Cloud API), and payment gateways (Stripe, Razorpay) with enterprise security.",
    checklist: [
      "Row-Level Security (RLS) data isolation",
      "Bidirectional calendar, email, and CRM synchronization",
      "Staging environment validation and edge latency testing",
    ],
  },
  {
    step: "04",
    title: "Scale",
    timeframe: "Days 19+",
    deliverable: "Production Handover & 30-Day Telemetry Warranty",
    body: "We roll out to production with zero downtime. Automated telemetry tracks error rates, conversion drop-offs, and server latency so the system improves continuously with live usage feedback.",
    checklist: [
      "Custom domain, SSL, and edge CDN DNS cutover",
      "Full GitHub repository and database ownership handover",
      "30-day post-launch monitoring and bug-fix warranty",
    ],
  },
];

const guarantees = [
  {
    title: "Fixed Scope & Pricing Guarantee",
    body: "No surprise invoices or ballooning hourly fees. We quote fixed sprint investments based on clear deliverables.",
  },
  {
    title: "100% Code & Data Ownership",
    body: "You own all code repositories, database instances, and API credentials. Zero proprietary lock-in.",
  },
  {
    title: "Rapid 7-Day First Checkpoint",
    body: "You see and test real running software within the first 7–10 business days, eliminating speculative risk.",
  },
];

const approachSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Egostix Media Engineering & Delivery Model",
  description:
    "A repeatable four-stage software operating model: Discover, Prototype, Integrate, and Scale.",
  step: steps.map((s, idx) => ({
    "@type": "HowToStep",
    position: idx + 1,
    name: s.title,
    text: s.body,
  })),
};

const ApproachPage = () => {
  return (
    <main className="w-full px-6 py-24 bg-white text-slate-900">
      <JsonLd data={approachSchema} />
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Header Section */}
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
            Execution Framework
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-slate-900 leading-tight">
            Engineering outcomes, not output.
          </h1>
          <p className="max-w-3xl text-sm font-inter leading-relaxed text-slate-700 tablet:text-base">
            We do not sell billable hours, endless decks, or disconnected deliverables. We execute through a disciplined, repeatable operating model that converts business bottlenecks into high-performing production systems with measurable results.
          </p>
        </section>

        {/* 4-Step Operating Model */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
              The 4-Stage Operating Model
            </p>
            <h2 className="text-2xl tablet:text-3xl font-mono font-bold text-slate-900">
              Discover &rarr; Prototype &rarr; Integrate &rarr; Scale
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 pt-2">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-neutral-300 bg-white p-6 tablet:p-8 space-y-4 hover:border-blue-600 transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded bg-blue-50 font-mono text-sm font-bold text-blue-700">
                        {step.step}
                      </div>
                      <h3 className="font-mono text-xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-blue-600 font-semibold bg-blue-50/80 px-2 py-0.5 rounded">
                      {step.timeframe}
                    </span>
                  </div>

                  <p className="text-xs tablet:text-sm font-inter leading-relaxed text-slate-600">
                    {step.body}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phase Checkpoints
                    </p>
                    <ul className="space-y-1.5 text-xs font-inter text-slate-700">
                      {step.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-blue-600 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 font-mono text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700">Milestone Deliverable:</span>{" "}
                  {step.deliverable}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Guarantees & Risk Mitigation */}
        <section className="space-y-6 border-t border-neutral-200 pt-12">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
              Risk Elimination
            </p>
            <h2 className="text-2xl font-mono font-bold text-slate-900">
              Our Commitments to Every Client
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {guarantees.map((g, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 bg-neutral-50/70 p-6 space-y-3"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <ShieldCheck className="size-4" />
                </div>
                <h3 className="font-mono text-base font-bold text-slate-900">
                  {g.title}
                </h3>
                <p className="text-xs font-inter leading-relaxed text-slate-600">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-neutral-200 pt-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-mono font-bold text-slate-900">
                Ready to review your system requirements?
              </h2>
              <p className="text-sm font-inter text-slate-600 leading-relaxed max-w-2xl">
                Share your operational workflow or project brief. We return with a system architecture review and prototype plan in 24–48 hours.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-blue-700 px-6 py-3.5 font-mono text-xs font-bold text-white transition hover:bg-blue-800 shadow-xs"
            >
              Start Discovery &rarr;
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ApproachPage;
