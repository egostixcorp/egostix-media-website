import React from "react";

export const metadata = {
  title: "Privacy Policy — Egostix Media",
  description: "Privacy policy and data governance practices of Egostix Media, an Egostix Engineering company.",
};

const PrivacyPage = () => {
  return (
    <main className="w-full px-6 py-24 bg-white text-slate-900">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header Section */}
        <section className="space-y-4 border-b border-neutral-200 pb-8 pt-10">
          <p className="font-mono text-xs uppercase tracking-wider text-blue-700">
            Data Governance
          </p>
          <h1 className="font-mono text-3xl font-bold tracking-tight tablet:text-4xl laptop:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last Updated: June 19, 2026
          </p>
        </section>

        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            Egostix Media (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an AI-native media and software studio operating under <strong>Egostix Engineering Pvt. Ltd.</strong> We build, deploy, and scale digital products, automation engines, creator infrastructure, and business websites.
          </p>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            This Privacy Policy outlines how we collect, process, and protect information when you engage our services, visit our website (media.egostix.com), or use the custom applications, automation workflows, and websites we engineer for your business.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            1. Information We Collect
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            Depending on how you interact with our studio and systems, we may collect the following categories of data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>
              <strong>Client Information:</strong> Contact details (names, business emails, phone numbers), billing credentials, and company profiles necessary to deliver development and automation services.
            </li>
            <li>
              <strong>Integration & API Keys:</strong> Temporary developer access to third-party accounts (e.g., Supabase, WhatsApp Business API, CRM endpoints, OpenAI/Anthropic developers dashboard) during the setup, testing, and deployment phases.
            </li>
            <li>
              <strong>Analytics & Deployed Metadata:</strong> Event metrics and interaction logs generated on websites or apps built by Egostix Media to measure system optimization, lead capture reliability, and pipeline status.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            2. How We Use Your Data
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            We use collected data strictly under systems-minded principles to engineer and run robust digital solutions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>
              <strong>To Build & Deploy Systems:</strong> Designing, prototyping, and integrating custom databases, internal dashboards, and customer acquisition platforms.
            </li>
            <li>
              <strong>Automation Optimization:</strong> Orchestrating and auditing automatic workflow integrations, email triggers, and chat sequences to ensure zero failure rates.
            </li>
            <li>
              <strong>Diagnostics and Security:</strong> Analyzing server logs and system exceptions to diagnose crashes, maintain high availability, and prevent security vulnerabilities.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            3. Data Sharing & Third-Party Processors
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            As an AI-native studio, our engineered systems interface with premium external subprocessors. We do not sell your data. We share data only to the extent required to execute our automation workflows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>
              <strong>AI Services & Large Language Models:</strong> Deployed applications route prompt and contextual metadata through secure enterprise APIs (e.g., Anthropic Claude API, OpenAI API). We configure these integrations to prevent data from being used to train foundation models.
            </li>
            <li>
              <strong>Database & Hosting Providers:</strong> We primarily utilize Supabase, Vercel, and other cloud providers to host client software and media systems, secured under industry-standard encryption protocols.
            </li>
            <li>
              <strong>Operational Automation:</strong> We coordinate webhook integrations with communications platforms (e.g., Twilio, WhatsApp Business) to run real-time messaging sequences.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            4. Security Standards
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            We implement strict operational security controls to prevent unauthorized access or disclosure:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>Secure credential management and database credential rotation.</li>
            <li>Use of industry-approved HTTPS standards for data transmission and SSL encryption.</li>
            <li>Encouraged sandbox environments for prototype workflows to isolate sensitive client systems.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            5. Your Governance Rights
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            You maintain full ownership of your data parameters. At any time, you can request access to, correction of, or deletion of any client accounts, system logs, or technical configurations stored in our development registries by contacting us.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4 border-t border-neutral-200 pt-8">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            Contact & Coordination
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            If you have questions regarding this Privacy Policy or wish to review data handling logs, please reach out to us:
          </p>
          <div className="font-mono text-sm text-slate-700 mt-2 space-y-2">
            <p><strong>Email:</strong> <a href="mailto:contact@egostix.com" className="text-blue-700 hover:underline">contact@egostix.com</a></p>
            <p><strong>Studio URI:</strong> <a href="https://media.egostix.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">media.egostix.com</a></p>
            <p><strong>Corporate:</strong> Egostix Engineering Pvt. Ltd., Badkulla, West Bengal, India</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPage;
