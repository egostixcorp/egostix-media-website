import React from "react";

const principles = [
  {
    title: "Systems, Not Campaigns",
    body: "We build frameworks that scale, learn, and evolve with use.",
    cursor: "engineering",
  },
  {
    title: "Outcomes Over Output",
    body: "Deliverables are meaningless unless something changes in reality.",
    cursor: "creativity",
  },
  {
    title: "Intelligence at the Core",
    body: "Data, automation, and feedback loops are designed in from day one.",
    cursor: "intelligence",
  },
];

const AboutSection = () => {
  return (
    <section className="w-full  px-6 py-24">
      <div className="mx-auto grid  gap-12 md:grid-cols-2 md:items-start">
        <div className="space-y-6">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            About
          </p>
          <h2 className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl">
            Egostix Media builds systems that survive real use.
          </h2>

          <p className="text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            We design and build intelligence-backed systems that turn ideas into
            repeatable, measurable outcomes across media, software, and
            operations.
          </p>

          <p className="text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            Where traditional media stops at content and software stops at
            features, we focus on adoption, performance, and measurable impact.
          </p>
        </div>

        <div className="space-y-6">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded border border-neutral-300 bg-white p-5"
              data-cursor={principle.cursor}
            >
              <h3 className="font-mono text-sm font-semibold text-blue-600">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm font-inter leading-relaxed text-neutral-600">
                {principle.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
