import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import siteContent from "@/content/site.json";
import { getBusinessCases, getFaqItems, getPrimaryNavigation, getResearchArticles } from "@/lib/content";
import { parseResearchArticleMarkdown } from "@/lib/research-content";

describe("Static Content Source", () => {
  it("exposes the primary navigation from repository-managed content", () => {
    expect(getPrimaryNavigation()).toEqual([
      { label: "首页", href: "/" },
      { label: "核心业务", href: "/services" },
      { label: "服务案例", href: "/cases" },
      { label: "映盛研究院", href: "/research" },
      { label: "映盛文化", href: "/culture" },
      { label: "关于映盛", href: "/about" },
      { label: "加入我们", href: "/careers" }
    ]);
  });

  it("exposes business cases with structured story fields from static content", () => {
    const cases = getBusinessCases();

    expect(cases).toHaveLength(3);
    expect(cases[0]).toMatchObject({
      slug: "tank-user-community-growth",
      client: "坦克汽车",
      title: "坦克汽车用户社群增长运营",
      relatedServiceSlug: "user-operations",
      challenge: expect.stringContaining("高价值用户"),
      solution: expect.stringContaining("用户分层")
    });
    expect(cases[0].execution).toHaveLength(3);
    expect(cases[0].result.summary).toContain("私域用户资产");
  });

  it("exposes research articles with GEO-friendly topic classification", () => {
    const articles = getResearchArticles();
    const researchDirectory = path.join(process.cwd(), "content", "research");
    const articleFiles = existsSync(researchDirectory)
      ? readdirSync(researchDirectory).filter((fileName) => fileName.endsWith(".md"))
      : [];

    expect(articles).toHaveLength(4);
    expect(articleFiles).toHaveLength(4);
    expect("researchArticles" in siteContent).toBe(false);
    expect(articles.map((article) => article.category)).toEqual([
      "行业洞察",
      "营销方法论",
      "平台趋势",
      "品牌增长研究"
    ]);
    expect(articles[0]).toMatchObject({
      slug: "private-domain-user-operations",
      title: "为什么品牌需要重新理解私域用户运营",
      summary: expect.stringContaining("用户关系")
    });
    expect(articles[0].sections[0].body).toContain("品牌官网");
  });

  it("exposes structured GEO FAQ content from static content", () => {
    const faqItems = getFaqItems();

    expect(faqItems).toHaveLength(6);
    expect(faqItems.map((item) => item.category)).toEqual([
      "公司事实",
      "服务范围",
      "目标客户",
      "合作流程",
      "服务方式",
      "GEO可见度"
    ]);
    expect(faqItems[0]).toMatchObject({
      question: "映盛是一家什么类型的公司？",
      answer: expect.stringContaining("数字营销与用户运营服务商")
    });
  });

  it("fails clearly when a Research Institute article is missing required frontmatter", () => {
    expect(() =>
      parseResearchArticleMarkdown(
        "missing-summary.md",
        [
          "---",
          "slug: missing-summary",
          "title: 缺少摘要的文章",
          "category: 行业洞察",
          "publishedAt: 2026-05-14",
          "readingTime: 3分钟阅读",
          "---",
          "",
          "## 小标题",
          "",
          "正文内容"
        ].join("\n")
      )
    ).toThrow("missing required frontmatter field: summary");
  });
});
