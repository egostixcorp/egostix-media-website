import React from "react";

const AboutSection = () => {
  return (
    <section className="w-full px-6 py-24">
      <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2 items-start">
        {/* Left: Statement */}
        <div className="space-y-6">
          <h2 className="text-2xl tablet:text-3xl laptop:text-4xl font-mono tracking-tight">
            About|<span className="text-blue-600">Egostix</span>{" "}
            <span className="font-light font-inter">Media</span>
          </h2>

          <p className="text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            <span className="border-b">
              <span className="text-blue-600 font-bold">Egostix</span>{" "}
              <span className="font-light font-inter">Media</span>
            </span>{" "}
            {""}
            is a systems-driven media and engineering studio. We design and
            build intelligence-backed systems that turn ideas into repeatable,
            measurable outcomes.
          </p>

          <p className="text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Where traditional media stops at content and software stops at
            features, we focus on what happens after — adoption, performance,
            and real-world impact.
          </p>
        </div>

        {/* Right: Principles */}
        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-sm font-semibold text-blue-600">
              Systems, Not Campaigns
            </h3>
            <p className="mt-1 text-sm font-inter text-neutral-600">
              We build frameworks that scale, learn, and evolve with use.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold text-blue-600">
              Outcomes Over Output
            </h3>
            <p className="mt-1 text-sm font-inter text-neutral-600">
              Deliverables are meaningless unless something changes in reality.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold text-blue-600">
              Intelligence at the Core
            </h3>
            <p className="mt-1 text-sm font-inter text-neutral-600">
              Data, automation, and feedback loops are designed in from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
