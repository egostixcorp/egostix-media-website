import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ApproachSection from "@/components/sections/ApproachSection";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import HomeWorkSection from "@/components/sections/HomeWorkSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactCtaSection from "@/components/sections/ContactCtaSection";
import { getProjects } from "@/data/work";
import JsonLd from "@/components/global/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Egostix Media — AI Business Websites, Custom Internal Tools & Automation",
  description:
    "Egostix Media is an AI-native productized software studio. We engineer high-converting business websites, custom internal tools, and operational automations in 2–4 weeks.",
  alternates: {
    canonical: "https://media.egostix.com",
  },
  openGraph: {
    title: "Egostix Media — AI Business Websites, Custom Internal Tools & Automation",
    description:
      "We engineer AI-powered business websites, custom internal tools, creator platforms, and workflow automations for fast-moving teams.",
    url: "https://media.egostix.com",
    type: "website",
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Egostix Media different from a traditional agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional agencies rely on billable hours and manual labor, which often compresses iteration speed and inflates production cycles. Egostix Media is AI-native: we utilize rapid AI-assisted engineering and modular software frameworks to ship production-grade websites, internal admin tools, and automation systems in weeks instead of months.",
      },
    },
    {
      "@type": "Question",
      name: "What is an 'AI-Powered Business Website' and how does it benefit my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We do not build static brochure pages. An AI-Powered Business Website is an operational system designed to drive customer acquisition. It integrates context-aware AI chat assistants (trained on your business criteria), automated booking calendars, dynamic SEO generation tools, and direct webhooks linking incoming data straight into CRMs.",
      },
    },
    {
      "@type": "Question",
      name: "What is your development and integration process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We operate under a strict, outcomes-driven workflow: Discover → Prototype → Integrate → Scale. We define the operational problem and constraints first, ship a functional prototype to test assumptions against real usage, integrate the final system into your CRM and data pipelines, and continuously optimize it using live analytics feedback.",
      },
    },
    {
      "@type": "Question",
      name: "What technology stack do you use to engineer systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We prioritize modern, robust, and repeatable technologies. Our primary web stack is Next.js, React.js, and TypeScript, styled with Tailwind CSS. Database operations and backends leverage Supabase (PostgreSQL), and we integrate models from OpenAI and Claude for intelligence layers.",
      },
    },
    {
      "@type": "Question",
      name: "How do we collaborate, and do you offer long-term support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We focus on outcomes over deliverables. We build initial, working proof-of-concepts in weeks. After launching and integrating the system into your active environment, we remain long-term development partners, continuously optimizing, scaling, and automating workflows as your operations grow.",
      },
    },
  ],
};

const Home = async () => {
  const publicProjects = getProjects();

  return (
    <main className="flex min-h-screen w-full flex-col items-center px-2 font-inter tablet:px-[10%] laptop:px-[15%]">
      <JsonLd data={homeFaqSchema} />
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <ServiceSection />
      <HomeWorkSection projects={publicProjects} />
      <FaqSection />
      <ContactCtaSection />
    </main>
  );
};

export default Home;
