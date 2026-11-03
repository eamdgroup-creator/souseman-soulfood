# Handoff: World’s Famous Souseman Soulfood website

## Status

**Preview** live at **https://souseman-soulfood.onrender.com**, for the owner's feedback. It is set to not be indexed by search engines (`NEXT_PUBLIC_PREVIEW=1`). Not launched on a custom domain.

- Code: https://github.com/eamdgroup-creator/souseman-soulfood (public; no secrets in it)
- Hosting: Render static site `souseman-soulfood` (Blueprint from `render.yaml`; auto-deploys on every push to `main`)

## How it works (one paragraph)

All text lives in `src/content/business.ts` and is built from `data/`. `npm run build` first runs `scripts/fetch-images.mjs`, which downloads the photos listed in `data/assets.json` and converts them to WebP. Then Next.js exports plain HTML to `./out`, and Render serves `./out` from its CDN. There's no server, no database and no secrets.

## Common edits

| Change | Where |
|---|---|
| Hours, phone, links | `src/content/business.ts` → `business` |
| Menu favorites or the board | `src/content/business.ts` → `featured`, `board` |
| Reviews shown | `src/content/business.ts` → `reviews` (verbatim only) |
| Photos | Add an entry to `data/assets.json` (or put files in `public/images/` and keep the entry) |
| Social preview image | `src/app/opengraph-image.tsx` (drawn at build from `business.ts`, so it updates when the rating there changes) |

Push to `main` and Render rebuilds automatically.

## Rollback [6.4]

- **Render:** Dashboard → `souseman-soulfood` → Deploys → pick the last good deploy → **Rollback**. If photos ever show as missing right after a deploy, run **Manual Deploy → Clear build cache & deploy**: Render's CDN can briefly cache 404s.
- **Git:** `git revert <bad-commit> && git push`, and Render rebuilds the fixed version.

## Accounts and owners [6.4] [7.3]

Fill these in at handoff:

| Service | What it's for | Owner (business or agency) | Login email | Plan / billing | Renews |
|---|---|---|---|---|---|
| GitHub repo | code and history (the backup) | Agency (`eamdgroup-creator`) | account email | Free | — |
| Render | hosting (preview) | Agency (Render "My Workspace") | account email | Free static site | — |
| Domain registrar | domain (at launch) | _TBD_ | _TBD_ | _TBD_ | _TBD_ |
| DNS | points the domain at the host | _TBD_ | _TBD_ | _TBD_ | — |
| Google Business Profile | listing, hours, reviews | Owner (needs claiming) | _TBD_ | Free | — |
| DoorDash storefront and Uber Eats | ordering | Owner | _TBD_ | per their contracts | — |

**Support contact** (who the business calls for website changes or outages): _TBD: name, phone, email._

**Maintenance owner:** _TBD_.

## Before launch (still open)

- Owner approves photos, hours, the menu list and the copy. See the "Needs owner approval" list in `brief.md`.
- Pick launch hosting. Render's free instances are not meant for production, and Vercel Hobby is non-commercial only. Check current plans and prices.
- Domain: buy one or use the owner's, connect it, verify HTTPS, redirect www and apex to one canonical host.
- Set `NEXT_PUBLIC_PREVIEW=0` and `NEXT_PUBLIC_SITE_URL=https://<domain>` so the site can be indexed.
- [7.1] Error reporting: the site is static, so the main risk is broken links or a failed build. Turn on Render deploy-failure email alerts; Sentry's browser SDK is optional.
- [7.5] Analytics, if wanted: Vercel Web Analytics, Umami or PostHog. Track `cta_call_click`, `cta_order_click`, `directions_click`. Verify each with a test click, keep personal data out of events, and update `/privacy/`.
- Claim the Google Business Profile, add the website URL to it, and fix the hours there.

## Backups [7.2]

There is no stored user data. The GitHub repo is the code backup. `data/` and `business.ts` are the content source. Photos re-download at build; ask the owner for originals and commit them to `public/images/` so the site doesn't depend on DoorDash's CDN.

## Maintenance schedule [7.4]

- **Monthly:**
  - Run `npm outdated` and `npm audit`, and update.
  - Run `BASE_URL=https://<site> npx playwright test`.
  - Tap Call, Order and Directions on a real phone.
  - Check the Render usage and bill.
- **Quarterly:**
  - Refresh the Google rating and review count, hours and the menu board in `business.ts`, and the social preview image.
  - Check domain and plan renewals.
- **Whenever the owner changes hours or the menu:** edit `business.ts` and push.
