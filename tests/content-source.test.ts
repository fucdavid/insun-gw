import { describe, expect, it } from "vitest";
import { getPrimaryNavigation } from "@/lib/content";

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
});
