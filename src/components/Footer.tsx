import Link from "next/link";
import { business } from "@/content/business";

export function Footer() {
  const open = business.hours.filter((h) => h.hours !== "Closed");
  return (
    <footer className="bg-ink pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl uppercase leading-none">
            World’s Famous <span className="text-mustard">Souseman</span> Soulfood
          </p>
          <address className="mt-4 not-italic leading-relaxed text-cream/85">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
            <br />
            <a href={`tel:${business.phone.tel}`} className="underline underline-offset-4 hover:text-mustard">
              {business.phone.display}
            </a>
          </address>
        </div>
        <div>
          <h2 className="font-display text-xl uppercase tracking-wide text-mustard">Hours</h2>
          <ul className="mt-3 space-y-1 text-cream/85">
            {open.map((h) => (
              <li key={h.day}>
                {h.short} · {h.hours}
              </li>
            ))}
            <li>
              {business.hours
                .filter((h) => h.hours === "Closed")
                .map((h) => h.short)
                .join(" & ")}{" "}
              · Closed
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl uppercase tracking-wide text-mustard">Follow for today’s menu</h2>
          <ul className="mt-3 space-y-1">
            {business.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="underline underline-offset-4 hover:text-mustard" rel="noopener noreferrer">
                  {s.label}: {s.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={business.order.uberEats.url} className="underline underline-offset-4 hover:text-mustard" rel="noopener noreferrer">
                Order on Uber Eats
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-cream/70 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {business.name}</p>
          <Link href="/privacy/" className="underline underline-offset-4 hover:text-mustard">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
