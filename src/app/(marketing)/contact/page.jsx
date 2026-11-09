import React from "react";
import ContactSection from "@/components/sections/ContactSection";
import JsonLd from "@/components/global/JsonLd";

export const metadata = {
  title: "Contact Us & Scope Your System | Egostix Media",
  description:
    "Get in touch with Egostix Media to scope your AI business website, custom internal tools, creator platform, or workflow automation. Functional prototypes in 1–2 weeks.",
  alternates: {
    canonical: "https://media.egostix.com/contact",
  },
  openGraph: {
    title: "Contact Us & Scope Your System | Egostix Media",
    description:
      "Scope your project with Egostix Media engineers. Rapid prototypes delivered in weeks for business websites, internal tools, and workflow automation.",
    url: "https://media.egostix.com/contact",
    type: "website",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Egostix Media",
  description:
    "Contact engineering coordinates for Egostix Media to scope AI business websites, internal tools, creator infrastructure, and workflow automations.",
  url: "https://media.egostix.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Egostix Media",
    telephone: "+91-73192-74817",
    email: "contact@egostix.com",
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

const ContactPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <JsonLd data={contactPageSchema} />
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Left-Aligned Header Section */}
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-bold">
            Project Scoping
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-neutral-900">
            Contact us to begin.
          </h1>
          <p className="max-w-3xl text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            We partner with businesses and scaleups that need operational velocity, workflow automation, or high-performance digital systems. Send your real business problem or workflow bottleneck—our engineers respond within 24–48 hours with a direct proposal and prototype timeline.
          </p>
        </section>

        {/* Embedded Interactive Contact Section (Coordinates Left / Form Right) */}
        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;
