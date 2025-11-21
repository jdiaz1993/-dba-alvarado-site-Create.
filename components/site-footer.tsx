import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 text-sm text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-sm">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Home Run Exterior Services
          </h2>
          <p className="mt-2 leading-6">
            Trusted exterior cleaning and maintenance professionals. We keep your property looking its best—from gutters to solar and beyond.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Support
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Contact / Free Quote
                </Link>
              </li>
              <li>
                <a
                  href="tel:+15555551234"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  (555) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@homerunexterior.com"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  hello@homerunexterior.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Service Areas
            </h3>
            <ul className="mt-3 space-y-2">
              <li>Residential</li>
              <li>Commercial</li>
              <li>HOA Communities</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Home Run Exterior Services. All rights reserved.</p>
          <p>Licensed • Insured • Satisfaction Guaranteed</p>
        </div>
      </div>
    </footer>
  );
}

