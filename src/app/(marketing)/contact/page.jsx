import { Input } from "@/components/ui/input";
import React from "react";

const contactDetails = [
  { label: "Email", value: "contact@egostix.com" },
  { label: "Phone", value: "+91 73192 74817" },
  { label: "Location", value: "Badkulla, Nadia, West Bengal, India - 741121" },
];

const ContactPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-16">
        <section className="space-y-6 pt-10">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Contact
          </p>
          <h1 className="max-w-4xl text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl">
            Contact us to begin.
          </h1>
          <p className="max-w-3xl text-sm font-inter leading-relaxed text-neutral-600 tablet:text-base">
            We work with teams that want operational improvement, automation,
            customer acquisition, or scalable digital systems. Send the real
            business problem, not a vague brief.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded border border-neutral-300 bg-white p-6">
            <h2 className="font-mono text-xl text-neutral-900">Coordinates</h2>
            <div className="mt-8 space-y-6">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <h3 className="font-mono text-sm font-semibold text-blue-600">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm font-inter leading-relaxed text-neutral-600">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-neutral-200 pt-6 text-xs font-inter leading-relaxed text-neutral-500">
              We typically respond within 24-48 hours. Clear goals and concrete
              constraints help us move faster.
            </p>
          </div>

          <form className="rounded border border-neutral-300 bg-white p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-xs font-mono text-neutral-700">
                  Name
                </label>
                <Input
                  type="text"
                  required
                  name="name"
                  className="mt-2 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-700">
                  Organization
                </label>
                <Input
                  type="text"
                  required
                  name="org"
                  className="mt-2 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-neutral-700">
                  Email
                </label>
                <Input
                  type="email"
                  required
                  name="email"
                  className="mt-2 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-neutral-700">
                  What are you trying to achieve?
                </label>
                <textarea
                  rows={5}
                  required
                  name="msg"
                  className="mt-2 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-mono text-white transition hover:bg-blue-700"
            >
              Start the conversation
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
