"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "How is Egostix Media different from a traditional agency?",
    answer:
      "Traditional agencies rely on billable hours and manual labor, which often compresses iteration speed and inflates production cycles. Egostix Media is AI-native: we utilize rapid AI-assisted engineering and modular software frameworks to ship production-grade websites, internal admin tools, and automation systems in weeks instead of months.",
  },
  {
    question:
      "What is an 'AI-Powered Business Website' and how does it benefit my business?",
    answer:
      "We do not build static brochure pages. An AI-Powered Business Website is an operational system designed to drive customer acquisition. It integrates context-aware AI chat assistants (trained on your business criteria), automated booking calendars, dynamic SEO generation tools, and direct webhooks linking incoming data straight into CRMs like HubSpot.",
  },
  {
    question: "What is your development and integration process?",
    answer:
      "We operate under a strict, outcomes-driven workflow: Discover → Prototype → Integrate → Scale. We define the operational problem and constraints first, ship a functional prototype to test assumptions against real usage, integrate the final system into your CRM and data pipelines, and continuously optimize it using live analytics feedback.",
  },
  {
    question: "What technology stack do you use to engineer systems?",
    answer:
      "We prioritize modern, robust, and repeatable technologies. Our primary web stack is Next.js, React.js, and TypeScript, styled with Tailwind CSS. Database operations and backends leverage Supabase (PostgreSQL), and we integrate models from OpenAI, Anthropic (Claude), and Codex for intelligence layers. For mobile apps, we deploy via Expo and React Native.",
  },
  {
    question: "How do we collaborate, and do you offer long-term support?",
    answer:
      "We focus on outcomes over deliverables. We build initial, working proof-of-concepts in weeks. After launching and integrating the system into your active environment, we remain long-term development partners, continuously optimizing, scaling, and automating workflows as your operations grow.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full border-t border-neutral-200 px-6 py-24 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto  space-y-12">
        {/* Section Header */}
        <div className="space-y-4 text-center md:text-left">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-700 font-bold">
            Frequently Asked Questions
          </p>
          <h2
            id="faq-heading"
            className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900 leading-tight"
          >
            Where imagination meets intelligence: Clarified.
          </h2>
          <p className="text-sm max-w-2xl font-inter leading-relaxed text-slate-700">
            Answers to common queries regarding our AI-assisted execution model,
            technology stack integration, and collaboration structure.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 border-t border-neutral-200 pt-6">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={index}
                className="border-b border-neutral-250 pb-4 transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left py-3 group hover:text-blue-700 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors flex items-start">
                    <span className="text-blue-700 mr-3 text-xs sm:text-sm pt-0.5 select-none font-bold">
                      0{index + 1}.
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`size-4.5 text-slate-500 group-hover:text-blue-700 shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-700" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-2"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm font-inter leading-relaxed text-slate-700 pr-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
