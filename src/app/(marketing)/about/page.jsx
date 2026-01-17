import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="w-full">
      {/* HERO — unchanged */}
      <section className="w-full h-screen flex items-center justify-center pb-20 relative">
        <div className="w-full mt-20 h-full flex items-center justify-center">
          <div className="w-full h-full overflow-hidden">
            <Image
              src={"/arun.png"}
              alt="Egostix founder portrait"
              width={1000}
              height={1000}
              className="size-full object-cover select-none"
            />
          </div>

          <div className="absolute select-none">
            <h1 className="laptop:text-6xl text-4xl font-bold">
              We&apos;re <span className="text-blue-600">Egostix.</span>
            </h1>
          </div>

          <div className="w-full h-full overflow-hidden">
            <Image
              src={"/titas.png"}
              alt="Egostix founder portrait"
              width={1000}
              height={1000}
              className="size-full object-cover select-none"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1 — Who We Are */}
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="text-2xl laptop:text-4xl font-mono tracking-tight">
            Not a Media Company. Not a Software Studio.
          </h2>

          <p className="text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Egostix exists to solve problems that sit between creativity,
            engineering, and intelligence. Problems where content alone fails,
            and software alone is not enough.
          </p>

          <p className="text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            We build systems — not campaigns. Systems that think, adapt, and
            produce outcomes across media, technology, and operations.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Why We Exist */}
      <section className="w-full bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <h3 className="text-xl laptop:text-3xl font-mono">
            Why Egostix Was Built
          </h3>

          <p className="text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Most organizations struggle not because of a lack of ideas, but
            because their tools don’t talk, their data stays fragmented, and
            decisions happen too late.
          </p>

          <p className="text-sm tablet:text-base font-inter text-neutral-600 leading-relaxed">
            Egostix was built to bridge those gaps — to combine intelligence,
            execution, and real-world feedback into one loop.
          </p>
        </div>
      </section>

      {/* SECTION 3 — How We Think */}
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-3">
          <div>
            <h4 className="font-mono text-lg text-blue-600">Systems First</h4>
            <p className="mt-2 text-sm font-inter text-neutral-600">
              We design systems that survive scale, not one-off solutions that
              collapse under real usage.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-lg text-blue-600">
              Outcomes Over Output
            </h4>
            <p className="mt-2 text-sm font-inter text-neutral-600">
              Deliverables don’t matter. What matters is whether something
              actually changes in the real world.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-lg text-blue-600">
              Intelligence Compounds
            </h4>
            <p className="mt-2 text-sm font-inter text-neutral-600">
              The best systems get better with use. We design for learning, not
              static execution.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — What We Work On */}
      <section className="w-full border-t px-6 py-24">
        <div className="mx-auto max-w-4xl space-y-6">
          <h3 className="text-xl laptop:text-3xl font-mono">What We Work On</h3>

          <ul className="space-y-3 text-sm tablet:text-base font-inter text-neutral-600">
            <li>• Media systems powered by intelligence</li>
            <li>• AI-assisted creative and operational workflows</li>
            <li>• Cross-platform software and automation</li>
            <li>• Infrastructure for real-time decision making</li>
          </ul>

          <p className="text-sm font-inter text-neutral-500 pt-4">
            We work with a small number of teams at a time. Depth beats volume.
          </p>
        </div>
      </section>
    </main>
  );
};

export default page;
