import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How the ${business.name} website handles your information.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-5xl uppercase leading-none">Privacy</h1>
        <p className="mt-2 text-sm text-smoke">Last updated November 3, 2026</p>
        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          <p>
            This website does not collect personal information. There are no forms, no accounts and no advertising or
            tracking cookies.
          </p>
          <h2 className="pt-4 font-display text-2xl uppercase tracking-wide">Things on this site run by others</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>The map</strong> is embedded from Google Maps. Google may set cookies and collect usage data under{" "}
              <a className="underline underline-offset-4" href="https://policies.google.com/privacy" rel="noopener noreferrer">
                Google’s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Ordering</strong> happens on DoorDash or Uber Eats. When you order there, their privacy policies apply.
            </li>
            <li>
              <strong>Social links</strong> open Facebook and Instagram, which have their own policies.
            </li>
          </ul>
          <h2 className="pt-4 font-display text-2xl uppercase tracking-wide">Questions</h2>
          <p>
            Call us at{" "}
            <a className="underline underline-offset-4" href={`tel:${business.phone.tel}`}>
              {business.phone.display}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
