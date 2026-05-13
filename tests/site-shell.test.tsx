import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteShell } from "@/components/site-shell";

describe("SiteShell", () => {
  it("renders the primary navigation and footer for the insun company website", () => {
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
      "加入我们",
      "FAQ"
    ]) {
      expect(navigation).toHaveTextContent(item);
    }

    expect(screen.getByRole("contentinfo")).toHaveTextContent("咨询合作");
  });
});
