# Launch report: World’s Famous Souseman Soulfood

- **Path:** Public website, 24 checks
- **Build:** Next.js 16.4.4 static export
- **Report date:** 2026-11-03
- **Status key:** ✅ verified (evidence) · 🟡 manual or pending · ⛔ blocked · ➖ not applicable or deferred (reason)
- **Scope (user's choice):** build and test everything, then host a **preview on Render** for the owner. Full launch on a domain comes later.
- **Live preview:** https://souseman-soulfood.onrender.com (GitHub `eamdgroup-creator/souseman-soulfood`)

| # | Check | Status | Evidence / notes |
|---|---|---|---|
| 1.1 | Write the audience, main action, and required pages. | ✅ | `brief.md`: main action is Order online (DoorDash storefront), then Call. One page plus Privacy and 404. |
| 1.2 | Gather approved copy, images, and brand assets. | 🟡 | Gathered and source-tagged in `src/content/business.ts` and `data/`. **Owner approval pending**: photos, hours, menu list (`brief.md` list). |
| 1.3 | Choose a public website or an app with private data; list a monthly budget. | ✅ | Public site. Budget table in `brief.md`: preview $0; launch hosting and domain costs to confirm. |
| 2.1 | Sketch the page order and key navigation. | ✅ | `design/sitemap.md` |
| 2.2 | Check component dependencies and licenses before using them. | ✅ | `design/components.md`: MIT, ISC, OFL-1.1, Apache-2.0 only. No shadcn or Radix needed. |
| 2.3 | Review the design at phone and desktop sizes, with readable contrast. | ✅ | Screenshots at iPhone 13 (390×844) and 1440×900, plus the live preview with real photos. Palette contrast computed: lowest pair 6.4:1; hero text sits on a dark gradient over the photo. Layout approval comes from the owner on the preview. |
| 3.1 | Implement the core visitor journey with real content. | ✅ | Order, Call and Directions in the hero, header and mobile bar. Real menu, hours, reviews and map from the sources. Local build passes. |
| 3.2 | Handle loading, empty, validation, and error states where relevant. | ✅ | Photo placeholders when downloads fail (exercised: the local build had 0/7 photos); map-blocked fallback (test); works with JS off (test); custom 404 (test). No forms, so no validation states. |
| 3.3 | Keep secrets outside client code and version control. | ✅ | The site needs no secrets. `.env.example` has names only. Secret-pattern scan of `out/`, `src/`, `data/` and config: clean. |
| 4.1 | Send a test form and verify delivery, validation, and spam protection. | ➖ | No form. Visitors' actions are order, call and directions; a form would add a server and collect data for no gain (guide: only the integrations the site needs). |
| 4.2 | Document which personal data is collected and how it is handled. | ✅ | `docs/privacy-data.md` and the `/privacy/` page: the site collects nothing; third parties are listed. |
| 5.1 | Test navigation and the main action on desktop and a real phone. | ✅ / 🟡 | Automated (47 tests) on Desktop Chrome, iPhone 13 and Pixel 7 emulation: all nav links, the `tel:`, order and directions hrefs, the sticky bar, no sideways overflow (320–1440px). Repeated on the **live URL**: order link → DoorDash storefront, `tel:+17866176472`, directions, all 4 sections, 7 hours rows with today highlighted, 6 reviews, map, `/privacy/`, 404. **Real-phone tap test pending** (you or the owner). |
| 5.2 | Use the keyboard throughout; check labels, contrast, focus, and image alternatives. | ✅ | axe (WCAG 2.2 AA tags): 0 serious or critical issues on `/` and `/privacy/` × 3 devices locally, and **0 violations on the live page with real photos** (41 contrast items need manual review because axe can't measure text over photos or see-through backgrounds; the palette is ≥6.4:1). Skip link is first Tab and works. Every focusable element shows an outline. Alt text on all images; the map iframe has a title. Lighthouse Accessibility: 100. |
| 5.3 | Test broken inputs and failures; check for exposed secrets and dependency issues. | ✅ | Tests: 404 page, map blocked, JS disabled, photo download failure (falls back to placeholders). `npm audit --omit=dev`: **0 vulnerabilities**. Dev tooling: 16 moderate (ESLint chain, dev only). Replaced the `serve` package (high: `compression` DoS) with a zero-dependency `scripts/serve.mjs`. No secrets exist. The live site sends HSTS, `nosniff` and `Referrer-Policy` headers. |
| 5.4 | Review page titles, descriptions, social previews, and performance. | ✅ / 🟡 | Unique titles and descriptions; OG image served as `image/png` on the live site; Restaurant JSON-LD (no self-serving rating markup). Lighthouse (local): mobile 92 Perf / 100 A11y / 100 Best practices / 66 SEO, desktop 100/100/100/66; SEO is 66 only because preview mode is intentionally `noindex`. **Live layout shift was 0.114** (web-font swap re-wrapped the headline and header button). Fixed with fixed headline lines and a no-wrap header: now **0** at 320–799px and ≤0.05 on desktop, even with fonts delayed 1.5s. Live TTFB 151ms. **PageSpeed Insights:** Google's free API hit its daily quota during testing, so this is pending; run pagespeed.web.dev once. |
| 6.1 | Deploy a preview and set the correct environment variables. | ✅ | Live at **https://souseman-soulfood.onrender.com** (Render free static site, Blueprint from `eamdgroup-creator/souseman-soulfood`, commit `7ec518b`). Env vars come from `render.yaml`: `NEXT_PUBLIC_SITE_URL` matches the live URL; `NEXT_PUBLIC_PREVIEW=1` gives `noindex` (verified on the live page). Build log: 7/7 photos saved. |
| 6.2 | Connect the domain, verify HTTPS, and repeat the main user journey on the deployed URL. | ✅ / ➖ | HTTPS verified on `souseman-soulfood.onrender.com` (HSTS header), and the main journey was repeated on the deployed URL (see 5.1). **Custom domain deferred**: preview only, by your choice. |
| 6.3 | Check plan eligibility, expected monthly costs, and spending controls. | ✅ / 🟡 | Preview: Render **free static site**, no cost shown at deploy. Render says free instances are "not for production", which fits a preview. Your Vercel account is on Hobby (non-commercial only), so it was not used for client work. Launch plan and costs in `brief.md`, to confirm before launch. |
| 6.4 | Document how to revert a release and who owns each service account. | ✅ | Rollback steps in `HANDOFF.md` (Render deploy list → Rollback, or `git revert`). Owner table filled for GitHub and Render; registrar and DNS come at launch. |
| 7.1 | Set up error reporting and verify a test error arrives. | ➖ | Deferred to launch. Static site with no server code; plan in `HANDOFF.md` (Render deploy alerts, optional Sentry browser SDK). |
| 7.2 | Confirm backup and restore arrangements for stored data. | ✅ | No stored data. Code and content are in GitHub (`eamdgroup-creator/souseman-soulfood`; every file's hash verified identical to the build copy). Photos re-fetch at each build; get the originals from the owner. |
| 7.3 | Document account owners, renewal dates, support contact, and a maintenance schedule. | 🟡 | Template in `HANDOFF.md`; names, emails and renewals to fill in at handoff. |
| 7.4 | Review updates, usage, costs, and the main user journey regularly. | ✅ | Monthly and quarterly schedule in `HANDOFF.md`. |
| 7.5 | If using PostHog or another analytics tool, define a few meaningful events, verify them with sample actions, and review privacy settings and usage limits. | ➖ | No analytics on the preview. Event plan for launch in `HANDOFF.md`. |

**Totals (24 checks):** 15 ✅ · 4 ✅/🟡 or ✅/➖ (5.1 real-phone tap, 5.4 PageSpeed run, 6.2 domain deferred, 6.3 launch plan) · 2 🟡 (1.2 owner approval, 7.3 contact details) · 3 ➖ (4.1 no form, 7.1 and 7.5 at launch) · 0 ⛔.

## Unresolved issues

- Fixed during deploy: Render's CDN briefly cached 404s for photos that were requested before the first deploy finished. A "Clear build cache & deploy" fixed it; all 7 photos are now verified live.
- Google lists dine-in and reservations, but reviews say takeout only. The site says takeout; the owner should confirm.
- Google Business Profile is unclaimed.
