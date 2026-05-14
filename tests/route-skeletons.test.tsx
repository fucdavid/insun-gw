import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import CareersPage from "@/app/careers/page";
import CasesPage from "@/app/cases/page";
import ContactPage from "@/app/contact/page";
import CulturePage from "@/app/culture/page";
import FaqPage from "@/app/faq/page";
import PrivacyPage from "@/app/privacy/page";
import ResearchPage from "@/app/research/page";
import ServicesPage from "@/app/services/page";

const routes = [
  { name: "首页", Page: HomePage, heading: "让品牌增长，回到真实用户关系" },
  { name: "核心业务", Page: ServicesPage, heading: "核心业务" },
  { name: "服务案例", Page: CasesPage, heading: "服务案例" },
  { name: "映盛研究院", Page: ResearchPage, heading: "映盛研究院" },
  { name: "映盛文化", Page: CulturePage, heading: "映盛文化" },
  { name: "关于映盛", Page: AboutPage, heading: "关于映盛" },
  { name: "加入我们", Page: CareersPage, heading: "加入我们" },
  { name: "FAQ", Page: FaqPage, heading: "FAQ" },
  { name: "咨询合作", Page: ContactPage, heading: "咨询合作" },
  { name: "隐私政策", Page: PrivacyPage, heading: "隐私政策" }
];

describe("route skeletons", () => {
  it.each(routes)("renders the $name route skeleton", ({ Page, heading }) => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: heading, level: 1 })).toBeInTheDocument();
  });

  it("renders a sales-ready services landing page", () => {
    render(<ServicesPage />);

    expect(screen.getByText(/六大核心业务围绕真实用户关系/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "用户运营" })).toBeInTheDocument();
    expect(screen.getByText("APP运营 · 小程序运营 · KOC运营 · 社群运营")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "了解用户运营" })).toHaveAttribute("href", "/services/user-operations");
    expect(screen.getByRole("link", { name: "咨询适合的业务组合" })).toHaveAttribute("href", "/contact");
  });
});
