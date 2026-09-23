import React from "react";

export const metadata = {
  title: "About Us | Egostix Media",
  description:
    "Egostix Media is an AI-native productized software and media studio building scalable systems where creativity, engineering, and intelligence meet.",
};

const principles = [
  {
    title: "Systems, Not Campaigns",
    body: "We build frameworks that scale, learn, and evolve with use.",
  },
  {
    title: "Outcomes Over Output",
    body: "Deliverables are meaningless unless something changes in reality.",
  },
  {
    title: "Intelligence Compounds",
    body: "Data, automation, and feedback loops are designed in from day one.",
  },
];

const AboutPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            About
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-neutral-900">
            Egostix Media builds systems where creativity, engineering, and
            intelligence meet.
          </h1>
          <p className="max-w-3xl text-sm tablet:text-base font-inter leading-relaxed text-neutral-600">
            We are an AI-native productized software and media studio under
            Egostix Engineering. We help modern businesses, creators, and
            organizations move faster with automation, rapid software
            development, and scalable digital infrastructure.
          </p>
        </section>

        <section className="grid gap-10 border-t border-neutral-200 pt-12 md:grid-cols-[0.8fr_1fr]">
          <h2 className="text-2xl font-mono tracking-tight tablet:text-3xl">
            Why Egostix Media exists
          </h2>
          <div className="space-y-5 text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            <p>
              Most businesses operate with disconnected tools, manual workflows,
              and weak digital infrastructure. AI has changed how software,
              content, automation, and digital experiences can be engineered.
            </p>
            <p>
              Egostix Media bridges that gap by helping teams build systems that
              reduce operational friction, improve customer acquisition, and
              adapt as the business grows.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded border border-neutral-300 bg-white p-6"
            >
              <h3 className="font-mono text-lg text-blue-600">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm font-inter leading-relaxed text-neutral-600">
                {principle.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
