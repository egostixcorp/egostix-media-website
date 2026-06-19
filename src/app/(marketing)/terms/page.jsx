import React from "react";

export const metadata = {
  title: "Terms of Service — Egostix Media",
  description: "Terms of service and engagement guidelines of Egostix Media, an Egostix Engineering company.",
};

const TermsPage = () => {
  return (
    <main className="w-full px-6 py-24 bg-white text-slate-900">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Header Section */}
        <section className="space-y-4 border-b border-neutral-200 pb-8 pt-10">
          <p className="font-mono text-xs uppercase tracking-wider text-blue-700">
            System Operations
          </p>
          <h1 className="font-mono text-3xl font-bold tracking-tight tablet:text-4xl laptop:text-5xl">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last Updated: June 19, 2026
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            1. Scope of Engagement
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            These Terms of Service govern the development, implementation, and deployment of software systems, web properties, creator platforms, and workflow automation solutions by <strong>Egostix Media</strong> (a business division of Egostix Engineering Pvt. Ltd.) for clients.
          </p>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            All projects are executed using our structured, compressed execution model: <strong>Discover &rarr; Prototype &rarr; Integrate &rarr; Scale</strong>. Each phase requires clear client criteria alignment before advancement.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            2. Intellectual Property Rights
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>
              <strong>Custom Client Assets:</strong> Upon full project payment, all custom design components, custom codebase modifications, and database architectures specifically developed for the client are assigned to the client.
            </li>
            <li>
              <strong>Proprietary Frameworks:</strong> Egostix Media retains all ownership, patents, and copyright in reusable baseline automation scripts, pre-built workflow templates, API configuration templates, and internal development tools used during project execution. Clients are granted a non-exclusive, perpetual, royalty-free license to use these libraries within their deployed scope.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            3. AI Services & Third-Party APIs
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            Our engineered products operate under an AI-native architecture and depend on external, third-party infrastructure:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>
              <strong>Usage Fees:</strong> Unless otherwise specified in the project agreement, clients are directly responsible for all third-party subscription fees, API consumption charges (e.g., OpenAI/Anthropic tokens, Supabase database, Twilio sms/WhatsApp credits), and web hosting overheads.
            </li>
            <li>
              <strong>AI Performance Limitations:</strong> AI tools operate probabilistically. While we design safety rails, feedback loops, and validation checks, Egostix Media is not liable for system hallucinations, factual errors in automated content, or service disruptions caused by downtime of third-party model providers.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            4. Support, Warranties, and SLA
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            We build systems to survive scale. We support the systems we build through standard warranties:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm font-inter text-slate-700">
            <li>
              <strong>Integration Review:</strong> All systems include a post-integration evaluation window (typically 30 days) to rectify coding exceptions, broken APIs, or styling anomalies.
            </li>
            <li>
              <strong>Exclusions:</strong> We are not responsible for software failure arising from modifications made to codebases or database structures by client teams post-delivery, or changes in third-party API configurations that break legacy integrations.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            5. Payment Terms and Billing
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            Milestone payouts align with our delivery framework. Retainer-based automation management services are billed monthly at the start of the billing period. Outstanding balances exceeding 15 days from invoicing may result in a temporary suspension of deployment environments, automated cron jobs, or API integrations.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            6. Limitation of Liability
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            To the maximum extent permitted by applicable law, in no event shall Egostix Engineering Pvt. Ltd. or its subsidiaries be liable for any indirect, special, incidental, or consequential damages (including loss of profits, system interruption, or data corruption) arising out of the use or inability to operate deployed systems.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-4 border-t border-neutral-200 pt-8">
          <h2 className="font-mono text-xl font-semibold text-slate-900">
            7. Governing Jurisdiction
          </h2>
          <p className="text-sm font-inter leading-relaxed text-slate-700">
            These terms are governed by and construed in accordance with the laws of West Bengal, India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in West Bengal, India.
          </p>
          <div className="font-mono text-sm text-slate-700 mt-4 space-y-2">
            <p><strong>Email:</strong> <a href="mailto:contact@egostix.com" className="text-blue-700 hover:underline">contact@egostix.com</a></p>
            <p><strong>Studio URI:</strong> <a href="https://media.egostix.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">media.egostix.com</a></p>
            <p><strong>Corporate Address:</strong> Egostix Engineering Pvt. Ltd., Badkulla, West Bengal, India</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TermsPage;
