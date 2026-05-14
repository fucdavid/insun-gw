import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteShell } from "@/components/site-shell";

describe("SiteShell", () => {
  it("renders the primary navigation, mobile navigation and footer for the insun company website", () => {
    render(
      <SiteShell>
        <main>页面内容</main>
      </SiteShell>
    );

    const navigation = screen.getByRole("navigation", { name: "主导航" });

    for (const item of [
      "首页",
      "核心业务",
      "服务案例",
      "映盛研究院",
      "映盛文化",
      "关于映盛",
      "加入我们"
    ]) {
      expect(navigation).toHaveTextContent(item);
    }

    expect(navigation).not.toHaveTextContent("FAQ");
    expect(screen.getByText("打开导航菜单")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "移动导航-核心业务" })).toHaveAttribute("href", "/services");
    expect(screen.queryByRole("link", { name: "移动导航-FAQ" })).not.toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("咨询合作");
    expect(screen.getByRole("contentinfo").querySelector('a[href="/faq"]')).toHaveTextContent("FAQ");
    expect(screen.getByRole("contentinfo").querySelector('a[href="/privacy"]')).toHaveTextContent("隐私政策");
  });
});
