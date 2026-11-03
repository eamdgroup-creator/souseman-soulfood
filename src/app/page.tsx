import { ExternalLink, MapPin, Navigation, Phone, ShoppingBag, Tv } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Photo } from "@/components/Photo";
import { HoursTable } from "@/components/HoursTable";
import { Stars } from "@/components/Stars";
import { board, business, copy, featured, reviews } from "@/content/business";
import { hasImage, restaurantJsonLd } from "@/lib/site";

export default function Home() {
  const heroPhoto = hasImage("hero-rib-dinners.webp");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink text-cream" aria-labelledby="hero-title">
          {heroPhoto ? (
            <Photo
              file="hero-rib-dinners.webp"
              alt="BBQ rib dinners with baked beans, mac and cheese, rice and sweet potatoes in takeout trays"
              label=""
              width={1800}
              height={1200}
              priority
              sizes="100vw"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
          ) : (
            <div className="pattern-diag absolute inset-0 -z-20" aria-hidden="true" />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-28 sm:pt-24">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-mustard">{copy.eyebrow}</p>
            {/* Fixed line breaks + nowrap: the headline's height can't change when the web font
                swaps in, so nothing below it jumps (layout shift). Size scales down on narrow phones. */}
            <h1
              id="hero-title"
              className="mt-3 max-w-4xl font-display text-[min(3.25rem,calc((100vw_-_2rem)/6.8))] uppercase leading-[0.9] sm:mt-4 sm:text-7xl md:text-8xl"
            >
              <span className="block whitespace-nowrap">World’s Famous</span>
              <span className="block whitespace-nowrap lg:inline text-mustard">Souseman</span>{" "}
              <span className="block whitespace-nowrap lg:inline">Soulfood</span>
            </h1>
            <p className="mt-6 max-w-xl text-2xl font-semibold leading-snug">{copy.tagline}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-cream/90">{copy.intro}</p>

            <a
              href={business.googleMapsUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm font-semibold ring-1 ring-cream/25 hover:bg-cream/20"
              rel="noopener noreferrer"
            >
              <Stars count={business.rating.score} label={`${business.rating.score} out of 5 stars`} />
              <span>
                {business.rating.score} · {business.rating.count} Google reviews
              </span>
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={business.order.primary.url}
                className="inline-flex items-center gap-2 rounded-full bg-pepper px-6 py-3.5 text-base font-bold uppercase tracking-wide text-white hover:bg-pepper-dark"
              >
                <ShoppingBag aria-hidden="true" width={18} height={18} />
                Order online
              </a>
              <a
                href={`tel:${business.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full bg-mustard px-6 py-3.5 text-base font-bold uppercase tracking-wide text-ink hover:brightness-95"
              >
                <Phone aria-hidden="true" width={18} height={18} />
                Call {business.phone.display}
              </a>
              <a
                href={business.directionsUrl}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-base font-bold uppercase tracking-wide text-cream ring-2 ring-cream/60 hover:ring-cream"
                rel="noopener noreferrer"
              >
                <Navigation aria-hidden="true" width={18} height={18} />
                Directions
              </a>
            </div>
          </div>
        </section>

        {/* NETFLIX BAND */}
        <section aria-label="Press" className="bg-pepper text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="flex items-center gap-3 font-display text-2xl uppercase tracking-wide sm:text-3xl">
              <Tv aria-hidden="true" width={26} height={26} />
              As featured on {business.press.outlet}’s {business.press.show}
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">{business.press.detail}</p>
          </div>
        </section>

        {/* MENU FAVORITES */}
        <section id="menu" aria-labelledby="menu-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pepper">The menu</p>
              <h2 id="menu-title" className="mt-2 font-display text-5xl uppercase leading-none sm:text-6xl">
                Come for the <span className="highlight">souse</span>
              </h2>
            </div>
            <p className="max-w-sm text-smoke">Prices and what’s available today show up when you order online.</p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <li key={item.name} className="group overflow-hidden rounded-2xl bg-paper shadow-sm ring-1 ring-ink/10">
                <div className="relative aspect-square overflow-hidden">
                  <Photo
                    file={item.image}
                    alt={item.imageAlt ?? item.name}
                    label={item.name}
                    width={900}
                    height={900}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {item.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-mustard px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl uppercase tracking-wide">{item.name}</h3>
                  <p className="mt-1.5 leading-relaxed text-smoke">{item.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ON THE BOARD */}
        <section aria-labelledby="board-title" className="bg-ink text-cream">
          <div className="pattern-diag">
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
              <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-mustard">On the board</p>
                  <h2 id="board-title" className="mt-2 font-display text-5xl uppercase leading-none">
                    Dinners & sides
                  </h2>
                  <p className="mt-4 leading-relaxed text-cream/85">
                    The menu changes from day to day. Call or check Facebook and Instagram for what’s cooking today.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`tel:${business.phone.tel}`}
                      className="inline-flex items-center gap-2 rounded-full bg-mustard px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink"
                    >
                      <Phone aria-hidden="true" width={16} height={16} />
                      Call to ask
                    </a>
                    {business.socials.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide ring-2 ring-cream/50 hover:ring-cream"
                        rel="noopener noreferrer"
                      >
                        {s.label}
                        <ExternalLink aria-hidden="true" width={14} height={14} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <h3 className="border-b-2 border-mustard pb-2 font-display text-3xl uppercase tracking-wide text-mustard">
                      Dinners
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-lg">
                      {board.dinners.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden="true" className="text-mustard">
                            ★
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="border-b-2 border-mustard pb-2 font-display text-3xl uppercase tracking-wide text-mustard">
                      Sides
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-lg">
                      {board.sides.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden="true" className="text-mustard">
                            ★
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section aria-labelledby="about-title" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl ring-1 ring-ink/10">
            <Photo
              file="chicken-souse.webp"
              alt="A bowl of chicken souse with chicken pieces and potatoes"
              label="Souse"
              width={900}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pepper">Meet the Souseman</p>
            <h2 id="about-title" className="mt-2 font-display text-5xl uppercase leading-none sm:text-6xl">
              What’s <span className="highlight">souse</span>?
            </h2>
            <p className="mt-5 text-xl leading-relaxed">{copy.whatIsSouse}</p>
            {copy.story.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 text-lg leading-relaxed text-smoke">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" aria-labelledby="reviews-title" className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-pepper">Reviews</p>
                <h2 id="reviews-title" className="mt-2 font-display text-5xl uppercase leading-none sm:text-6xl">
                  “The real deal”
                </h2>
              </div>
              <a
                href={business.googleMapsUrl}
                className="inline-flex items-center gap-3 self-start rounded-2xl bg-ink px-5 py-3 text-cream sm:self-auto"
                rel="noopener noreferrer"
              >
                <span className="font-display text-4xl leading-none text-mustard">{business.rating.score}</span>
                <span className="text-sm leading-tight">
                  <Stars count={business.rating.score} size={14} label={`${business.rating.score} out of 5 stars`} />
                  <br />
                  Read all {business.rating.count} on Google
                </span>
              </a>
            </div>
            <ul className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
              {reviews.map((r) => (
                <li key={r.name} className="mb-6 break-inside-avoid rounded-2xl bg-cream p-6 ring-1 ring-ink/10">
                  <figure>
                    <Stars count={r.stars} />
                    <blockquote className="mt-3 leading-relaxed">
                      <p>“{r.text}”</p>
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-smoke">
                      {r.name} · Google review · {r.year}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HOURS + LOCATION */}
        <section aria-labelledby="visit-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-pepper">Pick up</p>
          <h2 id="visit-title" className="mt-2 font-display text-5xl uppercase leading-none sm:text-6xl">
            Hours & location
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_3fr]">
            <div id="hours" className="rounded-2xl bg-paper p-6 ring-1 ring-ink/10">
              <h3 className="font-display text-2xl uppercase tracking-wide">Kitchen hours</h3>
              <div className="mt-4">
                <HoursTable />
              </div>
              <p className="mt-4 text-sm text-smoke">Hours can change. Call ahead to check what’s cooking.</p>
            </div>
            <div id="location" className="flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10">
              <iframe
                title={`Map showing ${business.name} at ${business.address.full}`}
                src={business.mapEmbedUrl}
                className="h-72 w-full border-0 lg:h-full lg:min-h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 font-semibold">
                  <MapPin aria-hidden="true" width={20} height={20} className="mt-0.5 shrink-0 text-pepper" />
                  <span>
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={business.directionsUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream"
                    rel="noopener noreferrer"
                  >
                    <Navigation aria-hidden="true" width={16} height={16} />
                    Directions
                  </a>
                  <a
                    href={`tel:${business.phone.tel}`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-3 text-sm font-bold uppercase tracking-wide"
                  >
                    <Phone aria-hidden="true" width={16} height={16} />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GOOD TO KNOW */}
        <section aria-labelledby="know-title" className="bg-mustard">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 id="know-title" className="font-display text-4xl uppercase leading-none sm:text-5xl">
              Good to know before you go
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {copy.goodToKnow.map((g) => (
                <li key={g.title} className="rounded-2xl bg-cream p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wide">{g.title}</h3>
                  <p className="mt-2 leading-relaxed text-smoke">{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
