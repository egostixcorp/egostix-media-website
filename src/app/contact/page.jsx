import React from "react";

const ContactPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-mono tracking-tight">
          Let&apos;s Talk Outcomes
        </h1>

        <p className="mt-4 max-w-2xl text-sm tablet:text-base font-inter text-neutral-600">
          We work with founders, enterprises, and teams who care about
          real-world results — not vanity metrics. If you have a complex problem
          worth solving, we should talk.
        </p>

        {/* Grid */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-800">
                Email
              </h3>
              <p className="text-sm font-inter text-neutral-600">
                contact@egostix.com
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-800">
                Phone
              </h3>
              <p className="text-sm font-inter text-neutral-600">
                +91 73192 74817
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm font-semibold text-neutral-800">
                Location
              </h3>
              <p className="text-sm font-inter text-neutral-600">
                Badkulla, Nadia
                <br />
                West Bengal, India — 741121
              </p>
            </div>

            <div className="pt-6 text-xs font-inter text-neutral-500">
              We typically respond within 24–48 hours. If your request is vague,
              expect pushback.
            </div>
          </div>

          {/* Contact Form (UI only) */}
          <form className="space-y-2 border p-6 rounded">
            <div>
              <label className="block text-xs font-mono text-neutral-700">
                Name
              </label>
              <input
                type="text"
                required
                name="name"
                className="mt-1 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-700">
                Organization
              </label>
              <input
                type="text"
                required
                name="org"
                className="mt-1 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-700">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                className="mt-1 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-700">
                What are you trying to achieve?
              </label>
              <textarea
                rows={4}
                required
                name="msg"
                className="mt-1 w-full rounded border px-3 py-2 text-sm font-inter focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-2 text-sm font-mono text-white hover:bg-blue-700 transition"
            >
              Start the Conversation
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
