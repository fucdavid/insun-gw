import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CaseDetailPage from "@/app/cases/[slug]/page";
import CasesPage from "@/app/cases/page";

describe("service cases pages", () => {
  it("lists available business cases with summaries and detail links", () => {
    render(<CasesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "服务案例" })).toBeInTheDocument();
    expect(screen.getByText(/用真实项目展示映盛如何把策略、内容、运营和数字阵地连接起来/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "坦克汽车用户社群增长运营" })).toBeInTheDocument();
    expect(screen.getByText(/围绕高价值用户识别/)).toBeInTheDocument();
    expect(screen.getByText("相关服务：用户运营")).toBeInTheDocument();
    expect(screen.getAllByText(/私域用户资产/).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "查看坦克汽车用户社群增长运营案例" })).toHaveAttribute(
      "href",
      "/cases/tank-user-community-growth"
    );
    expect(screen.getByRole("link", { name: "咨询类似服务案例" })).toHaveAttribute("href", "/contact");
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("renders a business case detail story with result and consultation CTA", async () => {
    render(await CaseDetailPage({ params: Promise.resolve({ slug: "tank-user-community-growth" }) }));

    expect(screen.getByRole("heading", { level: 1, name: "坦克汽车用户社群增长运营" })).toBeInTheDocument();
    expect(screen.getByText("客户背景")).toBeInTheDocument();
    expect(screen.getByText(/坦克汽车需要在产品关注度之外/)).toBeInTheDocument();
    expect(screen.getByText("相关服务：用户运营")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "挑战" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "解决方案" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "执行内容" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "案例结果" })).toBeInTheDocument();
    expect(screen.getAllByText(/私域用户资产/).length).toBeGreaterThan(0);
    expect(screen.getByText("公开指标")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "咨询类似项目" })).toHaveAttribute("href", "/contact");
  });

  it("does not render empty metric blocks when public metrics are confidential", async () => {
    render(await CaseDetailPage({ params: Promise.resolve({ slug: "lynk-social-content-operation" }) }));

    expect(screen.getByRole("heading", { level: 1, name: "领克汽车社会化内容运营" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "案例结果" })).toBeInTheDocument();
    expect(screen.getByText(/品牌社交阵地的持续表达能力/)).toBeInTheDocument();
    expect(screen.queryByText("公开指标")).not.toBeInTheDocument();
  });
});
