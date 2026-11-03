# World’s Famous Souseman Soulfood: website

A static Next.js 16 + Tailwind CSS v4 site for Souseman Larry's souse and soul food takeout in Opa-locka, FL.

```bash
npm ci
npm run build        # downloads photos (scripts/fetch-images.mjs), then exports to ./out
npm start            # serves ./out at http://localhost:3000
npm test             # Playwright: journeys, accessibility (axe), SEO checks
BASE_URL=https://souseman-soulfood.onrender.com EXPECT_PREVIEW=1 npm test   # test the deployed preview
```

- **Content:** `src/content/business.ts` (sources in `data/`)
- **Deploy:** `render.yaml` (Render Static Site Blueprint)
- **Docs:** `brief.md`, `design/`, `launch-report.md`, `HANDOFF.md`, `docs/privacy-data.md`
