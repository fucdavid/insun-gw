import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResearchArticlePage from "@/app/research/[slug]/page";
import ResearchPage from "@/app/research/page";

describe("research institute pages", () => {
  it("lists crawlable research articles by topic without presenting as company news", () => {
    render(<ResearchPage />);

    expect(screen.getByRole("heading", { level: 1, name: "映盛研究院" })).toBeInTheDocument();
    expect(screen.getAllByText("行业洞察").length).toBeGreaterThan(0);
    expect(screen.getAllByText("营销方法论").length).toBeGreaterThan(0);
    expect(screen.getAllByText("平台趋势").length).toBeGreaterThan(0);
    expect(screen.getAllByText("品牌增长研究").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { level: 2, name: "为什么品牌需要重新理解私域用户运营" })).toBeInTheDocument();
    expect(screen.getByText(/私域不是把用户拉进群/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "阅读为什么品牌需要重新理解私域用户运营" })).toHaveAttribute(
      "href",
      "/research/private-domain-user-operations"
    );
    expect(screen.queryByText(/公司新闻/)).not.toBeInTheDocument();
  });

  it("renders a research article detail page as crawlable expert content", async () => {
    render(await ResearchArticlePage({ params: Promise.resolve({ slug: "private-domain-user-operations" }) }));

    expect(screen.getByRole("heading", { level: 1, name: "为什么品牌需要重新理解私域用户运营" })).toBeInTheDocument();
    expect(screen.getByText("行业洞察")).toBeInTheDocument();
    expect(screen.getByText("2026-05-14")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "私域运营正在从触达工具走向关系资产" })).toBeInTheDocument();
    expect(screen.getByText(/品牌官网、企业微信、品牌APP、小程序和社群/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "返回映盛研究院" })).toHaveAttribute("href", "/research");
    expect(screen.queryByText(/公司新闻/)).not.toBeInTheDocument();
  });
});
