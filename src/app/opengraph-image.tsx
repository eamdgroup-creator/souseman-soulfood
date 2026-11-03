import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/content/business";

export const alt = `${business.name}: souse and soul food in Opa-locka, Miami. As featured on Netflix's Street Food: USA.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Generated once at build time (static export), using the self-hosted Anton font.
export default async function OpenGraphImage() {
  const anton = await readFile(
    path.join(process.cwd(), "node_modules/@fontsource/anton/files/anton-latin-400-normal.woff"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c1510",
          color: "#f7f0e4",
          padding: "64px 72px",
          fontFamily: "Anton",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#f2b632" }}>OPA-LOCKA · MIAMI</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.95 }}>
          <span>WORLD’S FAMOUS</span>
          <span style={{ color: "#f2b632" }}>SOUSEMAN SOULFOOD</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 34 }}>
          <span style={{ background: "#a8231b", padding: "10px 22px", borderRadius: 999 }}>
            AS FEATURED ON NETFLIX’S STREET FOOD: USA
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#f2b632" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {business.rating.score} · {business.rating.count} GOOGLE REVIEWS
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, weight: 400, style: "normal" }] },
  );
}
