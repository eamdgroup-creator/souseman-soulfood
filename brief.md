# Website brief: World’s Famous Souseman Soulfood

Captured 2026-11-03 from the Google Business Profile, the business's DoorDash storefront and Uber Eats page, Facebook/Instagram, and press (IMDb, Miami Herald). Raw data is in `data/`.

## Business at a glance

| | |
|---|---|
| Name | World’s Famous Souseman Soulfood (Google) |
| Owner | Souseman Larry |
| Category | Soul food restaurant, takeout |
| Address | 15140 NW 33rd Ave, Opa-locka, FL 33054 (a residential address) |
| Phone | (786) 617-6472 |
| Hours (Google) | Tue 3–8 PM · Thu–Sat 5–10 PM · Sun 3–8 PM · Mon & Wed closed |
| Rating | 4.7★ from 108 Google reviews (90 five-star) |
| Press | Netflix *Street Food: USA*, S1 E6 “Miami, Florida” (2022) |
| Website | None |
| Google profile | **Unclaimed** ("Claim this business" is showing) |

## [1.1] Audience, main action, pages

**Audience:**

- Miami Gardens / Opa-locka locals ordering dinner.
- Souse lovers across South Florida (reviews mention West Palm and the Keys).
- Visitors who saw the Netflix episode and want to find him (reviews from NY, PA, Germany).

**Main action:** Order online through the business's own DoorDash storefront. Calling is a close second, since reviews recommend calling to check the day's menu and hours. Secondary actions: Directions, Uber Eats.

**Pages:**

- One page with these sections: Hero, Netflix feature, Menu favorites, "On the board", Reviews, Hours & Location, Good to know.
- A Privacy page and a 404 page.
- One page is enough because the content is a menu, hours and a location; extra pages would be padding.

**No contact form.** The guide says to add only what the site needs. Visitors here want to order, call or get directions, so a form would add a server and collect personal data for no gain.

## [1.2] Content inventory and sources

All content lives in `src/content/business.ts`, tagged by source.

- **From Google:** name, address, phone, hours, rating, review count, popular dishes, review topics.
- **Reviews:** 6 Google reviews, quoted verbatim, shown as first name + last initial.
- **Photos:** 7 photos from the business's DoorDash storefront (a merchant photo shoot). No Yelp photos: Yelp blocks automated access, and its photos are customer uploads. Google's menu photos are also customer uploads, so they aren't used either.
- **Menu:**
  - Item names come from DoorDash, Google's popular dishes, and dishes named in reviews.
  - Item blurbs are short framing based on what reviewers say.
  - Prices are left off. Delivery-app prices may differ from the counter.
- **Press:** IMDb listing and Miami Herald article.

### Needs owner approval before a real launch

- [ ] Use of the DoorDash storefront photos (or send originals and photos of Larry and the setup).
- [ ] Hours. Reviews say delivery-app hours have been wrong.
- [ ] Current menu list ("On the board") and whether to show counter prices.
- [ ] Specials: reviewers mention $10 souse Tuesdays. Is it still running? It's a great hook if it is.
- [ ] Service type: Google says dine-in and reservations, but reviews say takeout only. The site says takeout.
- [ ] Payments (Google lists credit and debit cards) and parking. Not shown yet.
- [ ] Which Facebook page to feature: `/souseman` (Larry) or `/porksouse01` (business).
- [ ] The Google profile is unclaimed. Claiming it lets them fix hours, add the website and reply to reviews.

## [1.3] Path and budget

**Path:** a public website (no accounts, no private data).

**Stack:** Next.js 16 static export + Tailwind CSS v4, with fonts self-hosted from npm (Anton, Work Sans) and lucide icons. Fully static: no server or database.

**Budget:**

| Item | Preview (now) | Launch (later) |
|---|---|---|
| Hosting | Render free static site, $0 | Render paid or Vercel Pro. Render says not to use free instances for production; Vercel Hobby is non-commercial only. Check current pricing. |
| Domain | none (`*.onrender.com`) | One domain, about $10–20 per year (check the registrar) |
| Email and forms | none | none |
| Analytics | none | Vercel Web Analytics or Umami. Check pricing. |
| Error monitoring | none | Sentry free tier. Check quotas. |

## Starter prompt (filled in)

> Help me build a public website for World’s Famous Souseman Soulfood (Souseman Larry's souse and soul food takeout in Opa-locka, FL). Audience: Miami locals, South Florida souse fans, and visitors who saw him on Netflix's Street Food: USA. Main action: order online (DoorDash storefront), or call (786) 617-6472. Pages and content: one page with hero, Netflix feature, menu favorites with photos, rotating board, verbatim Google reviews (4.7★/108), hours and map, pickup tips; plus privacy and 404 pages. Budget and constraints: $0 preview on Render, static only, no invented claims, the owner approves photos/hours/menu before launch. Inspect my existing project first. Recommend the smallest suitable stack and explain costs and tradeoffs. Plan milestones covering design, implementation, integrations, testing, deployment, and maintenance. Use installed skills only after checking availability. Do not install every listed tool or invent claims. Add a backend only if the requirements need it. Build a local preview, verify the main journey and accessibility, report checks actually run and unresolved issues. Ask for my approval before publishing, creating paid resources, or using production credentials.
