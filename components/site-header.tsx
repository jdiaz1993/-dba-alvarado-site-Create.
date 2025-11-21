import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact / Free Quote" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold uppercase text-white">
            HR
          </span>
          <span className="hidden text-black dark:text-white sm:inline">
            Home Run Exterior Services
          </span>
          <span className="text-black dark:text-white sm:hidden">Home Run Exterior</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-200">
          <details className="group relative sm:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-transparent transition hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400">
              <span className="sr-only">Toggle navigation</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 20 14"
                fill="none"
              >
                <path
                  d="M1 1h18M1 7h18M1 13h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-sm text-zinc-700 transition hover:bg-emerald-500 hover:text-white dark:text-zinc-200 dark:hover:bg-emerald-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

