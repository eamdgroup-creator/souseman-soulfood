# Launch report: World’s Famous Souseman Soulfood

- **Path:** Public website, 24 checks
- **Build:** Next.js 16.4.4 static export
- **Report date:** 2026-11-03
- **Status key:** ✅ verified (evidence) · 🟡 manual or pending · ⛔ blocked · ➖ not applicable or deferred (reason)
- **Scope (user's choice):** build and test everything, then host a **preview on Render** for the owner. Full launch on a domain comes later.

| # | Check | Status | Evidence / notes |
|---|---|---|---|
| 1.1 | Write the audience, main action, and required pages. | ✅ | `brief.md`: main action is Order online (DoorDash storefront), then Call. One page plus Privacy and 404. |
| 1.2 | Gather approved copy, images, and brand assets. | 🟡 | Gathered and source-tagged in `src/content/business.ts` and `data/`. **Owner approval pending**: photos, hours, menu list (`brief.md` list). |
| 1.3 | Choose a public website or an app with private data; list a monthly budget. | ✅ | Public site. Budget table in `brief.md`: preview $0; launch hosting and domain costs to confirm. |
| 2.1 | Sketch the page order and key navigation. | ✅ | `design/sitemap.md` |
| 2.2 | Check component dependencies and licenses before using them. | ✅ | `design/components.md`: MIT, ISC, OFL-1.1, Apache-2.0 only. No shadcn or Radix needed. |
| 2.3 | Review the design at phone and desktop sizes, with readable contrast. | ✅ | `screenshots/` at iPhone 13 (390×844) and 1440×900. Palette contrast computed: lowest pair 6.4:1. axe color-contrast passes. Layout approval comes from the owner on the preview. |
| 3.1 | Implement the core visitor journey with real content. | ✅ | Order, Call and Directions in the hero, header and mobile bar. Real menu, hours, reviews and map from the sources. Local build passes. |
| 3.2 | Handle loading, empty, validation, and error states where relevant. | ✅ | Photo placeholders when downloads fail (exercised: the local build had 0/7 photos); map-blocked fallback (test); works with JS off (test); custom 404 (test). No forms, so no validation states. |
| 3.3 | Keep secrets outside client code and version control. | ✅ | The site needs no secrets. `.env.example` has names only. Secret-pattern scan of `out/`, `src/`, `data/` and config: clean. |
| 4.1 | Send a test form and verify delivery, validation, and spam protection. | ➖ | No form. Visitors' actions are order, call and directions; a form would add a server and collect data for no gain (guide: only the integrations the site needs). |
| 4.2 | Document which personal data is collected and how it is handled. | ✅ | `docs/privacy-data.md` and the `/privacy/` page: the site collects nothing; third parties are listed. |
| 5.1 | Test navigation and the main action on desktop and a real phone. | ✅ / 🟡 | Automated on Desktop Chrome, iPhone 13 and Pixel 7 emulation: all nav links, the `tel:`, order and directions hrefs, the sticky bar, no sideways overflow. **Real-phone check pending** on the Render preview URL. |
| 5.2 | Use the keyboard throughout; check labels, contrast, focus, and image alternatives. | ✅ | axe (WCAG 2.2 AA tags): 0 serious or critical issues on `/` and `/privacy/` × 3 devices. Skip link is first Tab and works. Every focusable element shows an outline. Alt text on all images; the map iframe has a title. Lighthouse Accessibility: 100 (mobile and desktop). |
| 5.3 | Test broken inputs and failures; check for exposed secrets and dependency issues. | ✅ | Tests: 404 page, map blocked, JS disabled. `npm audit --omit=dev`: **0 vulnerabilities**. Dev tooling: 16 moderate (ESLint chain, dev only). Replaced the `serve` package (high: `compression` DoS) with a zero-dependency `scripts/serve.mjs`. |
| 5.4 | Review page titles, descriptions, social previews, and performance. | ✅ / 🟡 | Unique titles and descriptions (test); OG image 1200×630 PNG + alt (test); Restaurant JSON-LD (test). Lighthouse mobile 92 Perf / 100 A11y / 100 Best practices / 66 SEO; desktop 100/100/100/66 (`reports/`). SEO is 66 only because preview mode is intentionally `noindex`. **PageSpeed Insights on the preview URL: pending.** |
| 6.1 | Deploy a preview and set the correct environment variables. | 🟡 | `render.yaml` ready (static site, `./out`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PREVIEW=1`, cache headers). Waiting on the GitHub repo and Render connection. |
| 6.2 | Connect the domain, verify HTTPS, and repeat the main user journey on the deployed URL. | ➖ | Deferred: preview only (user's choice). HTTPS on `onrender.com` and the journey rerun get checked on the preview. |
| 6.3 | Check plan eligibility, expected monthly costs, and spending controls. | 🟡 | Render docs: free instances are "not for production", so they're fine for a preview. Launch plan and costs listed in `brief.md`, to confirm before launch. |
| 6.4 | Document how to revert a release and who owns each service account. | ✅ / 🟡 | Rollback steps in `HANDOFF.md`. The owner table has _TBD_ rows to fill in at handoff. |
| 7.1 | Set up error reporting and verify a test error arrives. | ➖ | Deferred to launch. Static site with no server code; plan in `HANDOFF.md` (Render deploy alerts, optional Sentry browser SDK). |
| 7.2 | Confirm backup and restore arrangements for stored data. | ✅ | No stored data. Code and content are in Git; photos re-fetch at build (get the originals from the owner). |
| 7.3 | Document account owners, renewal dates, support contact, and a maintenance schedule. | 🟡 | Template in `HANDOFF.md`; names, emails and renewals to fill in at handoff. |
| 7.4 | Review updates, usage, costs, and the main user journey regularly. | ✅ | Monthly and quarterly schedule in `HANDOFF.md`. |
| 7.5 | If using PostHog or another analytics tool, define a few meaningful events, verify them with sample actions, and review privacy settings and usage limits. | ➖ | No analytics on the preview. Event plan for launch in `HANDOFF.md`. |

**Totals (24 checks):** 13 ✅ · 3 ✅/🟡 (5.1, 5.4, 6.4: verified, with one pending piece each) · 4 🟡 · 4 ➖ · 0 ⛔.

## Unresolved issues

- Photos haven't been seen on a running site yet. The build workspace can't reach the photo host, so they download during the Render build. **Verify on the preview.**
- Google lists dine-in and reservations, but reviews say takeout only. The site says takeout; the owner should confirm.
- Google Business Profile is unclaimed.
