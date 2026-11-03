import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { business } from "../src/content/business";

const isPreview = (process.env.EXPECT_PREVIEW ?? "1") === "1";

test.describe("[5.1] navigation and main actions", () => {
  test("home loads with the business name and main CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Souseman");
    const order = page.getByRole("link", { name: /order online/i }).first();
    await expect(order).toHaveAttribute("href", business.order.primary.url);
    const call = page.locator(`a[href="tel:${business.phone.tel}"]`).first();
    await expect(call).toBeVisible();
    await expect(page.getByRole("link", { name: /directions/i }).first()).toHaveAttribute("href", business.directionsUrl);
  });

  test("every nav link points at a section that exists", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" }); // instant jumps, so back-to-back clicks don't interrupt a smooth scroll
    await page.goto("/");
    for (const id of ["menu", "reviews", "hours", "location"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
      await page.locator(`header a[href="/#${id}"]:visible`).first().click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 });
    }
  });

  test("ordering, social and Google links are absolute https URLs", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href^='http']").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    expect(hrefs.length).toBeGreaterThan(5);
    for (const h of hrefs) expect(h.startsWith("https://")).toBeTruthy();
  });

  test("privacy page and footer link work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Privacy" }).click();
    await expect(page).toHaveURL(/\/privacy\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy");
  });

  test("mobile: sticky Call/Order bar shows and nothing overflows sideways", async ({ page, isMobile }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const bar = page.locator("div.fixed.bottom-0");
    if (isMobile) {
      await expect(bar).toBeVisible();
      await expect(bar.locator(`a[href="tel:${business.phone.tel}"]`)).toBeVisible();
    } else {
      await expect(bar).toBeHidden();
    }
  });
});

test.describe("[5.2] keyboard, labels, contrast, focus, alt text", () => {
  for (const path of ["/", "/privacy/"]) {
    test(`axe finds no serious or critical issues on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.nodes.length} nodes`)).toEqual([]);
    });
  }

  test("first Tab reaches the skip link and it moves focus to main", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard check runs on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("every focusable element shows a visible focus outline", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard check runs on desktop");
    await page.goto("/");
    const count = await page.locator("a:visible, button:visible, iframe").count();
    let missing = 0;
    for (let i = 0; i < Math.min(count, 60); i++) {
      await page.keyboard.press("Tab");
      const style = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        return { outline: cs.outlineStyle, width: parseFloat(cs.outlineWidth), tag: el.tagName };
      });
      if (style && style.tag !== "IFRAME" && (style.outline === "none" || style.width < 2)) missing++;
    }
    expect(missing).toBe(0);
  });

  test("images have alt text and placeholders have labels", async ({ page }) => {
    await page.goto("/");
    const imgsWithoutAlt = await page.locator("img:not([alt])").count();
    expect(imgsWithoutAlt).toBe(0);
    const unlabeled = await page.locator("[role=img]:not([aria-label])").count();
    expect(unlabeled).toBe(0);
    await expect(page.locator("iframe")).toHaveAttribute("title", /Map showing/);
  });
});

test.describe("[5.3] failures and broken inputs", () => {
  test("unknown URLs show the friendly 404 with Call and Order", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("isn’t on the menu");
    await expect(page.locator(`a[href="tel:${business.phone.tel}"]`).first()).toBeVisible();
  });

  test("page still works if the map embed is blocked", async ({ page }) => {
    await page.route("**/maps?**", (r) => r.abort());
    await page.goto("/");
    await expect(page.locator("#location")).toContainText(business.address.street);
    await expect(page.locator("#location").getByRole("link", { name: /directions/i })).toBeVisible();
  });

  test("page renders with JavaScript disabled (static HTML)", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(test.info().project.use.baseURL + "/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Souseman");
    await expect(page.locator("#hours tbody tr")).toHaveCount(7);
    await ctx.close();
  });
});

test.describe("[5.4] titles, descriptions, social previews", () => {
  test("home and privacy have unique titles and descriptions", async ({ page }) => {
    await page.goto("/");
    const homeTitle = await page.title();
    const homeDesc = await page.locator('meta[name="description"]').getAttribute("content");
    await page.goto("/privacy/");
    const privTitle = await page.title();
    const privDesc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(homeTitle).toContain("Opa-locka");
    expect(homeTitle).not.toEqual(privTitle);
    expect(homeDesc).not.toEqual(privDesc);
    expect((homeDesc ?? "").length).toBeGreaterThan(80);
  });

  test("Open Graph tags and image are present", async ({ page, request }) => {
    await page.goto("/");
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toBeTruthy();
    const path = new URL(og!).pathname;
    const img = await request.get(path);
    expect(img.status()).toBe(200);
    expect(img.headers()["content-type"]).toContain("image/png");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /Souseman/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Souseman/);
  });

  test("structured data describes the restaurant correctly", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw!);
    expect(data["@type"]).toBe("Restaurant");
    expect(data.telephone).toBe(business.phone.tel);
    expect(data.address.streetAddress).toBe(business.address.street);
    expect(data.openingHoursSpecification).toHaveLength(5);
    expect(data.aggregateRating).toBeUndefined();
  });

  test("preview builds ask search engines not to index", async ({ page, request }) => {
    test.skip(!isPreview, "only for preview builds");
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Disallow: /");
  });
});
