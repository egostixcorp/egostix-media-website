import React from "react";

/**
 * ApproachSection
 * - Uses font-inter and font-mono classes from your global setup.
 * - Responsive, accessible, and easy to style further.
 */

const STEPS = [
  {
    id: 1,
    title: "Discover",
    line: "Define the problem, stakeholders, and measurable outcomes. We map the data sources, constraints, and success metrics.",
    accent: "Research-led problem framing",
  },
//   {
//     id: 2,
//     title: "Model",
//     line: "Design a shared ontology and data contracts. Build the cross-system models that let healthcare, robotics, and media speak the same language.",
//     accent: "Interoperability-first architecture",
//   },
  {
    id: 2,
    title: "Prototype",
    line: "Ship a focused MVP that proves the hypothesis. Fast integrations, demo workflows, and measurable KPIs.",
    accent: "Productized experiments, not long spec docs",
  },
  {
    id: 3,
    title: "Integrate",
    line: "Deploy into real environments, connect operational systems, and automate essential workflows with robust APIs and monitoring.",
    accent: "Secure, observable, enterprise-grade rollouts",
  },
  {
    id: 4,
    title: "Scale & Learn",
    line: "Optimize models, automate decisions, and generalize learnings across verticals so intelligence compounds.",
    accent: "Cross-sector intelligence that improves with use",
  },
];

const ApproachSection = () => {
  return (
    <section
      aria-labelledby="approach-heading"
      className=" w-full mx-auto px-6 py-16"
    >
      <div className="w-full mx-auto text-left">
        <h2
          id="approach-heading"
          className="text-3xl tablet:text-4xl laptop:text-5xl font-mono tracking-tight"
        >
          Our Approach
        </h2>
        <p className="mt-4 text-sm tablet:text-base font-inter text-neutral-600">
          A repeatable system to turn complex problems into measurable outcomes
          — designed for enterprise scale and cross-industry intelligence.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
        {STEPS.map((step) => (
          <article
            key={step.id}
            className="relative flex flex-col gap-5 h-80 w-72 p-6 rounded border bg-white shadow-sm hover:shadow-md transition"
            aria-labelledby={`step-${step.id}-title`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-mono font-bold text-lg">
                {step.id}
              </div>
              <h3
                id={`step-${step.id}-title`}
                className="text-lg font-semibold font-mono text-blue-600"
              >
                {step.title}
              </h3>
            </div>

            <p className="text-sm text-neutral-700 font-inter">{step.line}</p>

            <div className="mt-auto pt-2">
              <span className="inline-block rounded px-3 py-1 text-xs font-mono bg-neutral-100 text-neutral-800">
                {step.accent}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ApproachSection;
