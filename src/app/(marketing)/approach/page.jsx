import React from "react";

const steps = [
  {
    title: "Discover",
    body: "We define the actual business problem, constraints, stakeholders, and measurable outcomes before execution starts.",
  },
  {
    title: "Prototype",
    body: "We ship focused demos, workflows, and MVPs quickly so assumptions are tested against real usage.",
  },
  {
    title: "Integrate",
    body: "We connect the solution to existing tools, teams, data, and operational environments with reliability in mind.",
  },
  {
    title: "Scale",
    body: "We automate, optimize, and improve the system so intelligence compounds with feedback.",
  },
];

const ApproachPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Approach
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl">
            Engineering outcomes, not output.
          </h1>
          <p className="max-w-3xl text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            We do not sell hours, decks, or disconnected deliverables. We work
            through a repeatable operating model that turns operational problems
            into systems with measurable results.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded border border-neutral-300 bg-white p-6"
            >
              <div className="flex size-12 items-center justify-center rounded bg-blue-50 font-mono text-lg font-semibold text-blue-600">
                {index + 1}
              </div>
              <h2 className="mt-6 font-mono text-xl text-neutral-900">
                {step.title}
              </h2>
              <p className="mt-3 text-sm font-inter leading-relaxed text-neutral-600">
                {step.body}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 border-t border-neutral-200 pt-12 md:grid-cols-[0.8fr_1fr]">
          <h2 className="text-2xl font-mono tracking-tight tablet:text-3xl">
            Discover → Prototype → Integrate → Scale
          </h2>
          <div className="space-y-5 text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            <p>
              The model stays intentionally simple because execution should not
              get buried under process. We discover what matters, prototype the
              highest-risk parts, integrate into the real environment, then
              scale what works.
            </p>
            <p>
              This is how websites, tools, automation, and creator systems stay
              connected to outcomes instead of becoming isolated assets.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ApproachPage;
