import imagesAvailable from "@/content/images.generated.json";
import { business } from "@/content/business";

// Public URL of the deployed site (set in the host's environment variables).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

// When NEXT_PUBLIC_PREVIEW=1 the site asks search engines not to index it.
// Keep it on until the owner approves the content.
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";

const available = imagesAvailable as Record<string, boolean>;
export function hasImage(file?: string): file is string {
  return Boolean(file && available[file]);
}

export function restaurantJsonLd() {
  const sameAs = [business.googleMapsUrl, ...business.socials.map((s) => s.url)];
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    servesCuisine: ["Soul food"],
    telephone: business.phone.tel,
    url: siteUrl + "/",
    ...(hasImage("hero-rib-dinners.webp") ? { image: [siteUrl + "/images/hero-rib-dinners.webp"] } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    openingHoursSpecification: business.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.day, opens: h.opens, closes: h.closes })),
    sameAs,
    // Intentionally no aggregateRating/review markup: Google treats ratings
    // a business marks up about itself as self-serving.
  };
}
