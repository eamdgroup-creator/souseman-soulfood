import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments stay out of search results until the owner approves the site.
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${siteUrl}/sitemap.xml` };
}
