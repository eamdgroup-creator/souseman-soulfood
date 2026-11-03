import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { business } from "@/content/business";

const nav = [
  { href: "/#menu", label: "Menu" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#hours", label: "Hours" },
  { href: "/#location", label: "Location" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/95 text-cream backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="min-w-0 truncate font-display text-xl uppercase leading-none tracking-wide sm:text-2xl">
          Souseman <span className="text-mustard">Soulfood</span>
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-semibold uppercase tracking-wider">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-mustard">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={business.order.primary.url}
          aria-label="Order online"
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-pepper px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-pepper-dark"
        >
          <ShoppingBag aria-hidden="true" width={16} height={16} />
          <span className="sm:hidden">Order</span>
          <span className="hidden sm:inline">Order online</span>
        </a>
      </div>
      <nav aria-label="Sections" className="border-t border-cream/10 lg:hidden">
        <ul className="mx-auto flex max-w-6xl justify-between gap-2 overflow-x-auto px-4 py-2 text-xs font-semibold uppercase tracking-wider">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="inline-block px-2 py-1 hover:text-mustard">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
