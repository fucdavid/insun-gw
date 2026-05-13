import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("homepage", () => {
  it("presents the homepage hero message and customer conversion actions", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "让品牌增长，回到真实用户关系" })
    ).toBeInTheDocument();
    const hero = within(screen.getByRole("region", { name: "首页首屏" }));
    expect(hero.getByText(/从公域获客到私域转化/)).toBeInTheDocument();
    expect(hero.getByRole("link", { name: "咨询合作" })).toHaveAttribute("href", "/contact");
    expect(hero.getByRole("link", { name: "查看核心业务" })).toHaveAttribute("href", "/services");
    expect(hero.getByRole("link", { name: "查看服务案例" })).toHaveAttribute("href", "/cases");
  });

  it("shows six homepage service summaries without representative clients", () => {
    render(<HomePage />);

    for (const serviceName of [
      "用户运营",
      "口碑营销",
      "社会化媒体营销",
      "直播/短视频营销",
      "互动公关",
      "数字渠道建设"
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: serviceName })).toBeInTheDocument();
    }

    expect(screen.getByText(/APP运营/)).toBeInTheDocument();
    expect(screen.getByText(/危机公关/)).toBeInTheDocument();
    expect(screen.getByText(/H5互动/)).toBeInTheDocument();
    expect(screen.queryByText("坦克汽车")).not.toBeInTheDocument();
    expect(screen.queryByText("吉利汽车")).not.toBeInTheDocument();
  });

  it("links each homepage service summary to its detail page", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /用户运营/ })).toHaveAttribute("href", "/services/user-operations");
    expect(screen.getByRole("link", { name: /口碑营销/ })).toHaveAttribute("href", "/services/word-of-mouth-marketing");
    expect(screen.getByRole("link", { name: /社会化媒体营销/ })).toHaveAttribute("href", "/services/social-media-marketing");
    expect(screen.getByRole("link", { name: /直播\/短视频营销/ })).toHaveAttribute(
      "href",
      "/services/live-short-video-marketing"
    );
    expect(screen.getByRole("link", { name: /互动公关/ })).toHaveAttribute(
      "href",
      "/services/interactive-public-relations"
    );
    expect(screen.getByRole("link", { name: /数字渠道建设/ })).toHaveAttribute(
      "href",
      "/services/digital-channel-construction"
    );
  });

  it("positions automotive as the advantage industry without excluding other target industries", () => {
    render(<HomePage />);

    expect(screen.getByText(/深耕汽车行业/)).toBeInTheDocument();
    expect(screen.getByText(/消费品/)).toBeInTheDocument();
    expect(screen.getByText(/金融/)).toBeInTheDocument();
    expect(screen.getByText(/旅游/)).toBeInTheDocument();
  });

  it("renders homepage as full-screen scroll panels", () => {
    render(<HomePage />);

    expect(screen.getByRole("region", { name: "首页首屏" })).toHaveAttribute("data-panel", "home");
    expect(screen.getByRole("region", { name: "核心业务" })).toHaveAttribute("data-panel", "services");
    expect(screen.getByRole("region", { name: "服务案例" })).toHaveAttribute("data-panel", "cases");
    expect(screen.getByRole("region", { name: "映盛研究院" })).toHaveAttribute("data-panel", "research");
    expect(screen.getByRole("region", { name: "关于映盛" })).toHaveAttribute("data-panel", "about");
    expect(screen.getByRole("navigation", { name: "首页模块导航" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "切换到下一屏" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "切换到核心业务" })).not.toHaveAttribute("aria-current");
  });
});
