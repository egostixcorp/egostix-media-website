import React from "react";

const steps = [
  {
    id: 1,
    title: "Discover",
    line: "Define the problem, stakeholders, constraints, and measurable outcomes.",
  },
  {
    id: 2,
    title: "Prototype",
    line: "Ship focused demos and workflows that validate assumptions quickly.",
  },
  {
    id: 3,
    title: "Integrate",
    line: "Connect systems into real environments with reliable operations.",
  },
  {
    id: 4,
    title: "Scale",
    line: "Automate, optimize, and improve the system with live feedback.",
  },
];

const ApproachSection = () => {
  return (
    <section
      aria-labelledby="approach-heading"
      className="w-full border-t border-neutral-200 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Approach
          </p>
          <h2
            id="approach-heading"
            className="mt-4 text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl"
          >
            Discover → Prototype → Integrate → Scale
          </h2>
          <p className="mt-4 text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            A repeatable system to turn complex problems into measurable
            outcomes without burying execution under process.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.id}
              className="flex min-h-64 flex-col rounded border border-neutral-300 bg-white p-6"
              aria-labelledby={`step-${step.id}-title`}
            >
              <div className="flex size-12 items-center justify-center rounded bg-blue-50 font-mono text-lg font-semibold text-blue-600">
                {step.id}
              </div>
              <h3
                id={`step-${step.id}-title`}
                className="mt-6 text-lg font-semibold font-mono text-neutral-900"
              >
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-inter leading-relaxed text-neutral-600">
                {step.line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
