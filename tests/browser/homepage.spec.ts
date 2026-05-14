import { expect, test } from "@playwright/test";

test.describe("homepage browser rendering", () => {
  test("renders the homepage with generated CSS on desktop and mobile", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })).toBeVisible();
    await expect(page.getByRole("img", { name: "映盛 logo" })).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询合作" }).first()).toBeVisible();

    const fullpage = page.locator('[aria-label="首页整屏切换"]');
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
    await expect(fullpage).toHaveAttribute("data-active-panel", "首页首屏");

    if ((viewport?.width ?? 0) >= 768) {
      await expect(page.getByRole("button", { name: "切换到下一屏" })).toBeVisible();
    }

    await page.mouse.wheel(0, 900);
    await expect(fullpage).toHaveAttribute("data-active-panel", "核心业务");
    await expect(page.getByRole("heading", { level: 2, name: "用户运营" })).toBeVisible();

    if ((viewport?.width ?? 0) >= 768) {
      await page.getByRole("button", { name: "切换到服务案例" }).click();
      await expect(fullpage).toHaveAttribute("data-active-panel", "服务案例");
      await expect(page.getByRole("heading", { level: 2, name: "从真实项目里看增长路径" })).toBeVisible();
    }
  });
});

test.describe("site navigation browser rendering", () => {
  test("opens the mobile navigation and keeps FAQ accessible as a direct GEO page", async ({ page }) => {
    await page.goto("/");

    const viewport = page.viewportSize();
    if ((viewport?.width ?? 0) < 768) {
      await page.getByText("打开导航菜单").click();
      await expect(page.getByRole("navigation", { name: "移动导航" }).getByRole("link", { name: "移动导航-核心业务" })).toBeVisible();
      await expect(page.getByRole("link", { name: "移动导航-FAQ" })).toHaveCount(0);
    }

    await page.goto("/faq");
    await expect(page.getByRole("heading", { level: 1, name: "FAQ" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "映盛是一家什么类型的公司？" })).toBeVisible();
    await expect(page.getByRole("main").getByText(/数字营销与用户运营服务商/)).toBeVisible();
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });
});

test.describe("listing page browser rendering", () => {
  test("renders sales-ready services and cases listing pages", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByRole("heading", { level: 1, name: "核心业务" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "用户运营" })).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询适合的业务组合" })).toBeVisible();

    await page.goto("/cases");
    await expect(page.getByRole("heading", { level: 1, name: "服务案例" })).toBeVisible();
    await expect(page.getByText(/用真实项目展示映盛如何把策略、内容、运营和数字阵地连接起来/)).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询类似服务案例" })).toBeVisible();
  });
});

test.describe("company content browser rendering", () => {
  test("renders about, culture and careers pages with real crawlable content", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1, name: "关于映盛" })).toBeVisible();
    await expect(page.getByText(/映盛是面向中大型品牌的数字营销与用户运营服务商/)).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询映盛服务" })).toBeVisible();

    await page.goto("/culture");
    await expect(page.getByRole("heading", { level: 1, name: "映盛文化" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "工作方式" })).toBeVisible();

    await page.goto("/careers");
    await expect(page.getByRole("heading", { level: 1, name: "加入我们" })).toBeVisible();
    await expect(page.getByText(/适合愿意理解品牌、用户和内容的人/)).toBeVisible();
    await expect(page.getByRole("link", { name: "联系加入映盛" })).toBeVisible();
  });
});

test.describe("consultation form browser rendering", () => {
  test("submits a consultation lead and shows success or actionable failure", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("姓名").fill("张三");
    await page.getByLabel("公司").fill("测试品牌");
    await page.getByLabel("联系方式").fill("zhangsan@example.com");
    await page.getByLabel("需求描述").fill("希望了解用户运营和数字渠道建设服务。");
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
    await page.getByLabel("姓名").fill("李四");
    await page.getByLabel("公司").fill("测试品牌");
    await page.getByLabel("联系方式").fill("lisi@example.com");
    await page.getByLabel("需求描述").fill("希望了解直播/短视频营销服务。");
    await page.getByRole("button", { name: "提交咨询" }).click();
    await expect(page.getByText("提交失败，请稍后重试或直接发送邮件。")).toBeVisible();
  });
});

test.describe("service detail browser rendering", () => {
  test("renders a service detail page with crawlable sections and CSS", async ({ page }) => {
    await page.goto("/services/user-operations");

    await expect(page.getByRole("heading", { level: 1, name: "用户运营" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "服务内容" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "全链路运营模型" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "服务客户" })).toBeVisible();
    await expect(page.getByRole("img", { name: "用户运营服务场景" })).toBeVisible();
    await expect(page.getByRole("img", { name: "坦克汽车 logo" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "咨询合作" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "查看案例" })).toBeVisible();

    const pageBackground = await page.locator("body").evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(pageBackground).toBe("rgb(247, 247, 244)");
  });
});

test.describe("case detail browser rendering", () => {
  test("renders a generated business case detail route", async ({ page }) => {
    await page.goto("/cases/tank-user-community-growth");

    await expect(page.getByRole("heading", { level: 1, name: "坦克汽车用户社群增长运营" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "案例结果" })).toBeVisible();
    await expect(page.getByRole("link", { name: "咨询类似项目" })).toBeVisible();
  });
});

test.describe("research detail browser rendering", () => {
  test("renders a generated research article route with crawlable content", async ({ page }) => {
    await page.goto("/research");
    await expect(page.getByRole("heading", { level: 2, name: "专题分类" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "推荐阅读" })).toBeVisible();

    await page.goto("/research/private-domain-user-operations");

    await expect(page.getByRole("heading", { level: 1, name: "为什么品牌需要重新理解私域用户运营" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "文章导读" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "私域运营正在从触达工具走向关系资产" })).toBeVisible();
    await expect(page.getByText(/品牌官网、企业微信、品牌APP、小程序和社群/)).toBeVisible();
  });
});

test.describe("SEO and GEO browser rendering", () => {
  test("serves crawl policy, sitemap and structured data in a real browser", async ({ page }) => {
    await page.goto("/robots.txt");
    await expect(page.locator("body")).toContainText("Allow: /");
    await expect(page.locator("body")).toContainText("Sitemap: https://www.insun.com/sitemap.xml");

    await page.goto("/sitemap.xml");
    await expect(page.locator("body")).toContainText("https://www.insun.com/services/user-operations");
    await expect(page.locator("body")).toContainText("https://www.insun.com/research/private-domain-user-operations");
    await expect(page.locator("body")).toContainText("https://www.insun.com/faq");

    await page.goto("/faq");
    const faqJsonLd = await page.locator('[data-testid="faq-json-ld"]').textContent();
    expect(faqJsonLd).toContain('"@type":"FAQPage"');
    expect(faqJsonLd).toContain("映盛是一家什么类型的公司？");

    await page.goto("/research/private-domain-user-operations");
    const articleJsonLd = await page.locator('[data-testid="article-json-ld"]').textContent();
    const breadcrumbJsonLd = await page.locator('[data-testid="breadcrumb-json-ld"]').textContent();
    expect(articleJsonLd).toContain('"@type":"Article"');
    expect(articleJsonLd).toContain("为什么品牌需要重新理解私域用户运营");
    expect(breadcrumbJsonLd).toContain('"@type":"BreadcrumbList"');
  });
});
