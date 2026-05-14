import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FaqPage from "@/app/faq/page";
import RootLayout, { metadata as rootMetadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import ResearchArticlePage, { generateMetadata as generateResearchMetadata } from "@/app/research/[slug]/page";
import ServiceDetailPage, { generateMetadata as generateServiceMetadata } from "@/app/services/[slug]/page";
import { getBusinessCases, getHomepageServices, getResearchArticles } from "@/lib/content";

const siteUrl = "https://www.insun.com";

describe("SEO and GEO foundations", () => {
  it("publishes root metadata with a canonical base and meaningful title template", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(`${siteUrl}/`);
    expect(rootMetadata.title).toEqual({
      default: "映盛 | 数字营销与用户运营服务商",
      template: "%s | 映盛"
    });
    expect(rootMetadata.description).toContain("用户运营、口碑营销、社会化媒体营销");
    expect(rootMetadata.alternates?.canonical).toBe("/");
    expect(rootMetadata.openGraph?.siteName).toBe("映盛");
  });

  it("exposes a sitemap and robots policy for all important public routes", async () => {
    const sitemapEntries = await sitemap();
    const urls = sitemapEntries.map((entry) => entry.url);

    expect(urls).toContain(`${siteUrl}/`);
    expect(urls).toContain(`${siteUrl}/services`);
    expect(urls).toContain(`${siteUrl}/faq`);
    expect(urls).toContain(`${siteUrl}/privacy`);

    for (const service of getHomepageServices()) {
      expect(urls).toContain(`${siteUrl}/services/${service.slug}`);
    }
    for (const businessCase of getBusinessCases()) {
      expect(urls).toContain(`${siteUrl}/cases/${businessCase.slug}`);
    }
    for (const article of getResearchArticles()) {
      expect(urls).toContain(`${siteUrl}/research/${article.slug}`);
    }

    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl
    });
  });

  it("adds organization structured data without hiding crawler-only content", () => {
    render(
      <RootLayout>
        <main>页面内容</main>
      </RootLayout>
    );

    const organization = readJsonLd("organization-json-ld");
    expect(organization["@type"]).toBe("Organization");
    expect(organization.name).toBe("映盛");
    expect(organization.alternateName).toContain("insun");
    expect(organization.url).toBe(siteUrl);
    expect(organization.knowsAbout).toContain("用户运营");
    expect(screen.queryByText(/crawler-only|仅供爬虫|AI爬虫专用/i)).not.toBeInTheDocument();
  });

  it("adds FAQPage structured data from the visible FAQ content", () => {
    render(<FaqPage />);

    const faq = readJsonLd("faq-json-ld");
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "映盛是一家什么类型的公司？"
    });
    expect(faq.mainEntity[0].acceptedAnswer.text).toContain("数字营销与用户运营服务商");
    expect(screen.getByRole("heading", { level: 3, name: "映盛是一家什么类型的公司？" })).toBeVisible();
  });

  it("adds article metadata and structured data for research detail pages", async () => {
    const metadata = await generateResearchMetadata({ params: Promise.resolve({ slug: "private-domain-user-operations" }) });
    expect(metadata.title).toBe("为什么品牌需要重新理解私域用户运营");
    expect(metadata.alternates?.canonical).toBe("/research/private-domain-user-operations");

    render(await ResearchArticlePage({ params: Promise.resolve({ slug: "private-domain-user-operations" }) }));
    const article = readJsonLd("article-json-ld");
    const breadcrumb = readJsonLd("breadcrumb-json-ld");

    expect(article["@type"]).toBe("Article");
    expect(article.headline).toBe("为什么品牌需要重新理解私域用户运营");
    expect(article.author.name).toBe("映盛研究院");
    expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toEqual([
      "首页",
      "映盛研究院",
      "为什么品牌需要重新理解私域用户运营"
    ]);
  });

  it("adds canonical metadata for service detail pages", async () => {
    const metadata = await generateServiceMetadata({ params: Promise.resolve({ slug: "user-operations" }) });
    expect(metadata.title).toBe("用户运营");
    expect(metadata.description).toContain("公域获客到私域转化");
    expect(metadata.alternates?.canonical).toBe("/services/user-operations");

    render(await ServiceDetailPage({ params: Promise.resolve({ slug: "user-operations" }) }));
    const breadcrumb = readJsonLd("breadcrumb-json-ld");
    expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toEqual(["首页", "核心业务", "用户运营"]);
  });
});

function readJsonLd(testId: string) {
  const element = screen.getByTestId(testId);
  return JSON.parse(element.textContent ?? "{}");
}
