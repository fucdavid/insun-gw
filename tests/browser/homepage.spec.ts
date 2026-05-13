import { expect, test } from "@playwright/test";

test.describe("homepage browser rendering", () => {
  test("renders the homepage with generated CSS on desktop and mobile", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "用户运营" })).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询合作" }).first()).toBeVisible();

    const heroBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);
    const heroHeadingFontSize = await page
      .getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

    expect(heroBackground).toBe("rgb(247, 247, 244)");
    expect(heroHeadingFontSize).toBeGreaterThan(40);
  });
});
