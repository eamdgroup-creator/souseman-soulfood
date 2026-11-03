import Link from "next/link";
import { Phone, ShoppingBag } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { business } from "@/content/business";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-pepper">404</p>
        <h1 className="mt-2 font-display text-6xl uppercase leading-none">This page isn’t on the menu</h1>
        <p className="mt-5 text-lg text-smoke">The link may be old. Here’s where you probably meant to go:</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-ink px-6 py-3.5 font-bold uppercase tracking-wide text-cream">
            Home
          </Link>
          <a
            href={business.order.primary.url}
            className="inline-flex items-center gap-2 rounded-full bg-pepper px-6 py-3.5 font-bold uppercase tracking-wide text-white"
          >
            <ShoppingBag aria-hidden="true" width={18} height={18} />
            Order online
          </a>
          <a
            href={`tel:${business.phone.tel}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-bold uppercase tracking-wide"
          >
            <Phone aria-hidden="true" width={18} height={18} />
            Call
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
