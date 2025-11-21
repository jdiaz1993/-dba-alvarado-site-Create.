const packages = [
  {
    name: "Home Plate",
    price: "$189",
    frequency: "One-time service",
    features: [
      "Full gutter cleaning & downspout flush",
      "Exterior window wash (up to 15 panes)",
      "Detailed condition report with photos",
      "48-hour rain check guarantee",
    ],
  },
  {
    name: "All-Star",
    price: "$89/mo",
    frequency: "Quarterly maintenance",
    features: [
      "Seasonal gutter & roofline inspections",
      "Solar panel cleaning twice a year",
      "Priority scheduling & service reminders",
      "10% savings on add-on services",
    ],
    highlighted: true,
  },
  {
    name: "Grand Slam",
    price: "Custom",
    frequency: "Tailored plans",
    features: [
      "Comprehensive commercial coverage",
      "Multi-property management support",
      "Dedicated account specialist",
      "Flexible billing & reporting",
    ],
  },
];

export default function PricingPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Pricing
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Honest pricing, tailored to your property.
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Choose the plan that fits your maintenance rhythm. Every package includes insured technicians, eco-friendly cleaning solutions, and our satisfaction guarantee.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-3">
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className={`relative rounded-3xl border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
              pkg.highlighted
                ? "border-emerald-500 bg-white dark:bg-zinc-950"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            }`}
          >
            {pkg.highlighted ? (
              <span className="absolute -top-3 left-1/2 w-40 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-center text-xs font-semibold uppercase tracking-wide text-white">
                Most Popular
              </span>
            ) : null}
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {pkg.name}
            </h2>
            <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
              {pkg.frequency}
            </p>
            <p className="mt-6 text-4xl font-semibold text-zinc-900 dark:text-white">
              {pkg.price}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                pkg.highlighted
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "border border-zinc-900 text-zinc-900 hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-100 dark:text-zinc-100 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              }`}
            >
              Get started
            </a>
          </article>
        ))}
      </div>
      <section className="rounded-3xl bg-zinc-900 px-8 py-10 text-white dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold">Need more details?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-200">
          Pricing varies based on square footage, roof pitch, accessibility, and material type. Reach out for a precise quote—most assessments are completed within 24 hours.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <a
            href="tel:+15555551234"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
          >
            Call (555) 555-1234
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-emerald-600"
          >
            Request a custom quote
          </a>
        </div>
      </section>
    </section>
  );
}

