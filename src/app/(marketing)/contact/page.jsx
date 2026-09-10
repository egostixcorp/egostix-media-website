import React from "react";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact Us | Egostix Media",
  description:
    "Get in touch with Egostix Media to scope your AI business website, internal tools, creator platform, or workflow automation.",
};

const ContactPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Left-Aligned Header Section */}
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Contact
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-neutral-900">
            Contact us to begin.
          </h1>
          <p className="max-w-3xl text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            We work with teams that want operational improvement, automation, customer acquisition, or scalable digital systems. Send the real business problem, not a vague brief.
          </p>
        </section>

        {/* Embedded Interactive Contact Section (Coordinates Left / Form Right) */}
        <ContactSection />
      </div>
    </main>
  );
};

export default ContactPage;

