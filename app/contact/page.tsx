import Link from "next/link";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Contact / Free Quote
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Let’s schedule your next exterior service.
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Share a few details about your property and we’ll respond within one business day. Prefer to chat now? Call or text and we’ll get you scheduled right away.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Full name
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Email
              <input
                type="email"
                name="email"
                placeholder="hello@homerunexterior.com"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="(555) 555-1234"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Zip code
              <input
                type="text"
                name="zip"
                placeholder="98001"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </label>
          </div>
          <label className="space-y-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            How can we help?
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your project, service needs, and ideal timing."
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Submit request
          </button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            We respect your privacy. By submitting, you agree to receive communications related to your request. You can opt out at any time.
          </p>
        </form>
        <aside className="space-y-6 rounded-3xl bg-zinc-900 p-8 text-zinc-200 dark:bg-zinc-950">
          <h2 className="text-2xl font-semibold text-white">Reach us directly</h2>
          <div className="space-y-4 text-sm leading-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-400">Call or text</p>
              <a href="tel:+15555551234" className="mt-1 block text-lg font-semibold text-white">
                (555) 555-1234
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-400">Email</p>
              <a
                href="mailto:hello@homerunexterior.com"
                className="mt-1 block text-sm text-zinc-200 hover:text-emerald-300"
              >
                hello@homerunexterior.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-400">Service hours</p>
              <p className="mt-1">Monday – Saturday, 7am – 6pm</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-400">Connect</p>
              <div className="mt-2 flex gap-3 text-sm">
                <Link href="https://www.facebook.com" className="hover:text-emerald-300">
                  Facebook
                </Link>
                <Link href="https://www.instagram.com" className="hover:text-emerald-300">
                  Instagram
                </Link>
                <Link href="https://www.linkedin.com" className="hover:text-emerald-300">
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 p-6 text-sm leading-6">
            <h3 className="text-lg font-semibold text-white">Service area</h3>
            <p className="mt-2 text-zinc-200">
              We proudly serve King, Pierce, and Snohomish Counties with on-site assessments available within 24 hours.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

