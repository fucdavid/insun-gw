import { describe, expect, it } from "vitest";
import { getBusinessCases, getPrimaryNavigation } from "@/lib/content";

describe("Static Content Source", () => {
  it("exposes the primary navigation from repository-managed content", () => {
    expect(getPrimaryNavigation()).toEqual([
      { label: "首页", href: "/" },
      { label: "核心业务", href: "/services" },
      { label: "服务案例", href: "/cases" },
      { label: "映盛研究院", href: "/research" },
      { label: "映盛文化", href: "/culture" },
      { label: "关于映盛", href: "/about" },
      { label: "加入我们", href: "/careers" },
      { label: "FAQ", href: "/faq" }
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
});
