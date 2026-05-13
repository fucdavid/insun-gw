import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServiceDetailPage from "@/app/services/[slug]/page";
import ServicesPage from "@/app/services/page";

describe("core service pages", () => {
  it("lists the six public service detail pages from the core services area", () => {
    render(<ServicesPage />);

    const expectedLinks = [
      ["用户运营", "/services/user-operations"],
      ["口碑营销", "/services/word-of-mouth-marketing"],
      ["社会化媒体营销", "/services/social-media-marketing"],
      ["直播/短视频营销", "/services/live-short-video-marketing"],
      ["互动公关", "/services/interactive-public-relations"],
      ["数字渠道建设", "/services/digital-channel-construction"]
    ] as const;

    for (const [name, href] of expectedLinks) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }

    expect(screen.queryByRole("link", { name: /GEO/ })).not.toBeInTheDocument();
  });

  it("renders a complete service detail page from static content", async () => {
    render(await ServiceDetailPage({ params: Promise.resolve({ slug: "user-operations" }) }));

    expect(screen.getByRole("heading", { level: 1, name: "用户运营" })).toBeInTheDocument();
    expect(screen.getByText(/服务内容/)).toBeInTheDocument();
    expect(screen.getByText(/服务平台/)).toBeInTheDocument();
    expect(screen.getByText(/服务对象/)).toBeInTheDocument();
    expect(screen.getByText(/业务模块/)).toBeInTheDocument();
    expect(screen.getByText(/代表客户/)).toBeInTheDocument();
    expect(screen.getByText(/坦克汽车/)).toBeInTheDocument();
    expect(screen.getByText(/企业微信/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "咨询合作" })).toHaveAttribute("href", "/contact");
  });

  it("renders all six service detail pages with required sections and representative clients", async () => {
    for (const slug of [
      "user-operations",
      "word-of-mouth-marketing",
      "social-media-marketing",
      "live-short-video-marketing",
      "interactive-public-relations",
      "digital-channel-construction"
    ]) {
      const { unmount } = render(await ServiceDetailPage({ params: Promise.resolve({ slug }) }));

      expect(screen.getByText(/服务内容/)).toBeInTheDocument();
      expect(screen.getByText(/服务平台/)).toBeInTheDocument();
      expect(screen.getByText(/服务对象/)).toBeInTheDocument();
      expect(screen.getByText(/业务模块/)).toBeInTheDocument();
      expect(screen.getByText(/代表客户/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "咨询合作" })).toHaveAttribute("href", "/contact");
      expect(screen.getAllByText(/汽车/).length).toBeGreaterThan(0);

      unmount();
    }
  });
});
