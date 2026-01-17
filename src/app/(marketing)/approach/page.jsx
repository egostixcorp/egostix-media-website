import React from "react";

const ApproachPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-24">
        {/* 1. Hero */}
        <section className="space-y-6">
          <h1 className="text-3xl tablet:text-4xl laptop:text-6xl font-mono tracking-tight">
            Engineering Outcomes,
            <br />
            Not Outputs
          </h1>

          <p className="max-w-3xl text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Most teams ship features. Some ship content. We engineer systems
            that reliably produce results — across media, software, data, and
            intelligence workflows.
          </p>
        </section>

        {/* 2. What We Don’t Do */}
        <section className="space-y-6">
          <h2 className="text-2xl tablet:text-3xl font-mono">
            What We Explicitly Don&apos;t Do
          </h2>

          <ul className="grid gap-4 md:grid-cols-2 text-sm font-inter text-neutral-700">
            <li>✕ Long decks without execution</li>
            <li>✕ Campaigns without measurable outcomes</li>
            <li>✕ Tools without ownership or accountability</li>
            <li>✕ One-off creative with no system behind it</li>
          </ul>

          <p className="text-sm font-inter text-neutral-600 max-w-3xl">
            If you&apos;re looking for “just marketing” or “just development”, we are
            not a fit. If you want outcomes that compound, keep reading.
          </p>
        </section>

        {/* 3. The Operating Model */}
        <section className="space-y-12">
          <h2 className="text-2xl tablet:text-3xl font-mono">
            Our Operating Model
          </h2>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-lg text-blue-600">1. Discover</h3>
              <p className="mt-2 text-sm font-inter text-neutral-700">
                We start by defining the *actual* problem — not the symptom.
                This includes stakeholders, incentives, constraints, and what
                success means in numbers, not opinions.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-lg text-blue-600">2. Prototype</h3>
              <p className="mt-2 text-sm font-inter text-neutral-700">
                Instead of long specifications, we ship focused prototypes:
                workflows, demos, or live systems that validate assumptions
                early.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-lg text-blue-600">3. Integrate</h3>
              <p className="mt-2 text-sm font-inter text-neutral-700">
                We plug solutions into real environments — existing tools,
                teams, and data. Reliability, observability, and security are
                non-negotiable.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-lg text-blue-600">
                4. Scale & Learn
              </h3>
              <p className="mt-2 text-sm font-inter text-neutral-700">
                Once outcomes are repeatable, we automate, optimize, and
                generalize. Intelligence compounds when systems learn from real
                usage.
              </p>
            </div>
          </div>
        </section>

        {/* 4. How Engagements Work */}
        <section className="space-y-6">
          <h2 className="text-2xl tablet:text-3xl font-mono">
            How Engagements Actually Work
          </h2>

          <p className="max-w-3xl text-sm font-inter text-neutral-600">
            We don&apos;t sell hours. We don&apos;t sell slides. We engage on clearly
            defined outcomes.
          </p>

          <ul className="space-y-3 text-sm font-inter text-neutral-700">
            <li>• Clear success metrics defined upfront</li>
            <li>• Short feedback loops with real-world data</li>
            <li>• Tight collaboration with decision-makers</li>
            <li>• Ownership until the system works in practice</li>
          </ul>
        </section>

        {/* 5. Cross-Vertical Logic */}
        <section className="space-y-6">
          <h2 className="text-2xl tablet:text-3xl font-mono">
            Why This Works Across Industries
          </h2>

          <p className="max-w-4xl text-sm font-inter text-neutral-600 leading-relaxed">
            Healthcare, media, robotics, and infrastructure look different on
            the surface — but underneath, they share the same problems:
            fragmented data, slow decisions, and brittle workflows.
            <br />
            <br />
            Our approach focuses on those invariants, allowing intelligence and
            systems to transfer across domains instead of being rebuilt every
            time.
          </p>
        </section>

        {/* 6. CTA */}
        <section className="border-t pt-12 space-y-4">
          <h3 className="text-xl font-mono">If This Resonates</h3>
          <p className="text-sm font-inter text-neutral-600">
            We work with a small number of teams at a time. If you have a real
            problem with real stakes, reach out.
          </p>
        </section>
      </div>
    </main>
  );
};

export default ApproachPage;
