const services = [
  {
    id: "gutter-care",
    title: "Gutter Cleaning & Protection",
    summary:
      "Prevent overflow, leaks, and costly repairs with comprehensive gutter maintenance.",
    items: [
      "Full debris removal, bagging, and haul-away",
      "Downspout flushing and performance test",
      "Minor sealing and bracket tightening",
      "Optional gutter guard installation",
    ],
    price: "Starting at $189",
  },
  {
    id: "solar-panel-cleaning",
    title: "Solar Panel Cleaning",
    summary:
      "Boost energy efficiency with spot-free, mineral-safe cleaning that protects panel warranties.",
    items: [
      "Pure water and soft-bristle cleaning process",
      "Performance inspection and output report",
      "Eco-friendly detergents safe for roofing",
      "Flexible maintenance schedules",
    ],
    price: "Starting at $12 per panel",
  },
  {
    id: "exterior-cleaning",
    title: "Window & Exterior Washing",
    summary:
      "Restore curb appeal with streak-free windows, siding washes, and targeted pressure cleaning.",
    items: [
      "Interior/exterior window cleaning",
      "Low-pressure soft washing for siding",
      "Driveway, patio, and deck pressure washing",
      "Rust and stain removal treatments",
    ],
    price: "Custom quotes available",
  },
  {
    id: "custom-tote-bags",
    title: "Custom Tote Bags",
    summary:
      "Personalized tote bags perfect for promotional events, corporate gifts, or personal use.",
    items: [
      "Custom logo and design printing",
      "Multiple size and material options",
      "Bulk order discounts available",
      "Fast turnaround times",
    ],
    price: "Starting at $15 per bag",
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Services
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Exterior solutions built for long-lasting protection.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Tailored maintenance packages that keep your home or business looking its best. We combine attentive service, premium equipment, and preventative maintenance insights to stay ahead of the elements.
        </p>
      </header>
      <div className="space-y-10">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-md transition hover:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {service.summary}
                </p>
                <ul className="grid gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start gap-3 rounded-2xl bg-emerald-500/10 p-5 text-sm text-zinc-700 dark:text-zinc-200">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Investment
                </span>
                <span className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  {service.price}
                </span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                >
                  Request quote
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="rounded-3xl bg-zinc-900 px-8 py-10 text-white dark:bg-zinc-950">
        <h2 className="text-2xl font-semibold">Maintenance Memberships</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-200">
          Sign up for quarterly or semi-annual maintenance and never worry about forgotten cleanings. Members receive priority scheduling, bundled pricing, and proactive inspection reports.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
        >
          Talk with a specialist
        </a>
      </section>
    </section>
  );
}

