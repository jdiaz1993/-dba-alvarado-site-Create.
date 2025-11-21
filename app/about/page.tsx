export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          About Us
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Home Run Exterior Services
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          We are a family-owned team committed to preserving the beauty and safety of every property we touch. Since our first ladder climb in 2014, we have focused on responsive service, meticulous workmanship, and building trust with every homeowner and property manager.
        </p>
      </header>
      <div className="grid gap-10 md:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Deliver reliable exterior cleaning and protection that outperforms expectations. We prioritize preventative maintenance that extends the life of your roof, gutters, solar panels, and exterior surfaces.
          </p>
        </article>
        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            What Sets Us Apart
          </h2>
          <ul className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            <li>• Fully licensed and insured technicians</li>
            <li>• Eco-friendly cleaning solutions safe for landscaping</li>
            <li>• Detailed inspection reports after every visit</li>
            <li>• Custom maintenance plans tailored to your property</li>
          </ul>
        </article>
      </div>
      <section className="space-y-6 rounded-3xl bg-emerald-500 px-6 py-8 text-white sm:px-8">
        <h2 className="text-2xl font-semibold">Core Values</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { title: "Integrity", description: "Transparent pricing, dependable scheduling, and honest recommendations." },
            { title: "Craftsmanship", description: "Meticulous attention to detail and proven techniques on every surface." },
            { title: "Community", description: "Supporting local neighborhoods while protecting the homes and businesses we serve." },
          ].map((value) => (
            <div key={value.title} className="space-y-2 rounded-2xl bg-white/10 p-4">
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="text-sm leading-6 text-emerald-50">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

