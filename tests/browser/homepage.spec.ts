import { expect, test } from "@playwright/test";

test.describe("homepage browser rendering", () => {
  test("renders the homepage with generated CSS on desktop and mobile", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })).toBeVisible();
    await expect(page.getByRole("img", { name: "映盛 logo" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "用户运营" })).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询合作" }).first()).toBeVisible();

    const hero = page.getByRole("region", { name: "首页首屏" });
    const heroHeight = await hero.evaluate((element) => element.getBoundingClientRect().height);
    const viewport = page.viewportSize();
    const heroBackground = await hero.evaluate((element) => getComputedStyle(element).backgroundImage);
    const heroHeadingFontSize = await page
      .getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

    expect(heroHeight).toBeGreaterThanOrEqual((viewport?.height ?? 720) - 2);
    expect(heroBackground).toContain("/home/hero.png");
    expect(heroHeadingFontSize).toBeGreaterThan(40);

    await page.getByRole("region", { name: "核心业务" }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { level: 2, name: "用户运营" })).toBeVisible();
  });
});

test.describe("service detail browser rendering", () => {
  test("renders a service detail page with crawlable sections and CSS", async ({ page }) => {
    await page.goto("/services/user-operations");

    await expect(page.getByRole("heading", { level: 1, name: "用户运营" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "服务内容" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "代表客户" })).toBeVisible();
    await expect(page.getByRole("img", { name: "坦克汽车 logo" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "咨询合作" })).toBeVisible();

    const pageBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(pageBackground).toBe("rgb(247, 247, 244)");
  });
});
