import { expect, test, type Page, type TestInfo } from "@playwright/test";

const publicRoutes = [
  "/",
  "/services",
  "/services/user-operations",
  "/cases",
  "/cases/tank-user-community-growth",
  "/research",
  "/research/private-domain-user-operations",
  "/culture",
  "/about",
  "/careers",
  "/faq",
  "/contact",
  "/privacy",
  "/robots.txt",
  "/sitemap.xml"
];

test.describe("Yingsheng website acceptance", () => {
  test("key public routes are reachable", async ({ page }) => {
    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.ok(), `${route} should return a successful response`).toBe(true);
    }
  });

  test("homepage exposes hero, primary navigation, core services and consultation CTA", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询合作" }).first()).toBeVisible();

    const viewport = page.viewportSize();
    if ((viewport?.width ?? 0) >= 768) {
      const primaryNavigation = page.getByRole("navigation", { name: "主导航" });
      await expect(primaryNavigation.getByRole("link", { name: "核心业务" })).toHaveAttribute("href", "/services");
      await expect(primaryNavigation.getByRole("link", { name: "服务案例" })).toHaveAttribute("href", "/cases");
      await expect(primaryNavigation.getByRole("link", { name: "加入我们" })).toHaveAttribute("href", "/careers");
    } else {
      await page.getByText("打开导航菜单").click();
      await expect(page.getByRole("link", { name: "移动导航-核心业务" })).toBeVisible();
      await expect(page.getByRole("link", { name: "移动导航-加入我们" })).toBeVisible();
    }

    await page.mouse.wheel(0, 900);
    await expect(page.getByRole("heading", { level: 2, name: "用户运营" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "口碑营销" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "数字渠道建设" })).toBeVisible();
  });

  test("service detail pages show representative clients outside homepage service summaries", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 900);
    await expect(page.getByRole("region", { name: "核心业务" })).not.toContainText("坦克汽车");

    await page.goto("/services/user-operations");
    await expect(page.getByRole("heading", { level: 2, name: "服务客户" })).toBeVisible();
    await expect(page.getByRole("img", { name: "坦克汽车 logo" })).toBeVisible();
    await expect(page.getByRole("img", { name: "沃尔沃汽车 logo" })).toBeVisible();
  });

  test("business case detail pages include the required story sections and result", async ({ page }) => {
    await page.goto("/cases/tank-user-community-growth");

    await expect(page.getByRole("heading", { level: 1, name: "坦克汽车用户社群增长运营" })).toBeVisible();
    await expect(page.getByText("客户背景")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "挑战" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "解决方案" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "执行内容" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "案例结果" })).toBeVisible();
  });

  test("FAQ content is visible, crawlable and not crawler-only", async ({ page }) => {
    await page.goto("/faq");

    await expect(page.getByRole("heading", { level: 1, name: "FAQ" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "映盛提供哪些核心服务？" })).toBeVisible();
    await expect(page.getByRole("main")).toContainText("六大核心服务");
    await expect(page.getByRole("main")).not.toContainText("仅供爬虫");
  });

  test("consultation form covers validation, success, error and privacy policy", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("main").getByRole("link", { name: "隐私政策" })).toHaveAttribute("href", "/privacy");

    await page.getByRole("button", { name: "提交咨询" }).click();
    const validationMessage = await page.locator('input[name="name"]').evaluate((input) => (input as HTMLInputElement).validationMessage);
    expect(validationMessage.length).toBeGreaterThan(0);

    await page.getByLabel("姓名").fill("王五");
    await page.getByLabel("公司").fill("测试品牌");
    await page.getByLabel("联系方式").fill("wangwu@example.com");
    await page.getByLabel("需求描述").fill("希望了解口碑营销和社会化媒体营销服务。");
    await page.getByRole("button", { name: "提交咨询" }).click();
    await expect(page.getByText("咨询已提交，映盛团队会尽快联系你。")).toBeVisible();

    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, message: "提交失败，请稍后重试或直接发送邮件。" })
      });
    });
    await page.goto("/contact");
    await page.getByLabel("姓名").fill("赵六");
    await page.getByLabel("公司").fill("测试品牌");
    await page.getByLabel("联系方式").fill("zhaoliu@example.com");
    await page.getByLabel("需求描述").fill("希望了解互动公关服务。");
    await page.getByRole("button", { name: "提交咨询" }).click();
    await expect(page.getByText("提交失败，请稍后重试或直接发送邮件。")).toBeVisible();
  });

  test("SEO and GEO outputs are visible through browser-readable responses", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/数字营销与用户运营服务商/);
    expect(await readJsonLd(page, "organization-json-ld")).toContain('"@type":"Organization"');

    await page.goto("/faq");
    expect(await readJsonLd(page, "faq-json-ld")).toContain('"@type":"FAQPage"');

    await page.goto("/research/private-domain-user-operations");
    expect(await readJsonLd(page, "article-json-ld")).toContain('"@type":"Article"');
    expect(await readJsonLd(page, "breadcrumb-json-ld")).toContain('"@type":"BreadcrumbList"');
  });

  test("desktop and mobile screenshot checks cover core user journeys", async ({ page }, testInfo) => {
    const pagesToCapture = [
      ["/", "homepage"],
      ["/services/user-operations", "service-detail"],
      ["/cases/tank-user-community-growth", "case-detail"],
      ["/faq", "faq"],
      ["/contact", "consultation-form"],
      ["/careers", "careers"]
    ] as const;

    for (const [route, name] of pagesToCapture) {
      await page.goto(route);
      await expectUsableScreenshot(page, testInfo, name);
    }
  });
});

async function readJsonLd(page: Page, testId: string) {
  return page.locator(`[data-testid="${testId}"]`).evaluate((element) => element.textContent ?? "");
}

async function expectUsableScreenshot(page: Page, testInfo: TestInfo, name: string) {
  await expect(page.locator("body")).toBeVisible();
  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(horizontalOverflow).toBeLessThanOrEqual(2);

  const screenshot = await page.screenshot({ fullPage: false });
  expect(screenshot.byteLength).toBeGreaterThan(10_000);
  await testInfo.attach(`${name}.png`, { body: screenshot, contentType: "image/png" });
}
