import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "@/app/contact/page";
import PrivacyPage from "@/app/privacy/page";

describe("contact and privacy pages", () => {
  it("renders direct contact methods and a consultation form with privacy link", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: "咨询合作" })).toBeInTheDocument();
    expect(screen.getByText(/business@insun/)).toBeInTheDocument();
    expect(screen.getByLabelText("姓名")).toBeRequired();
    expect(screen.getByLabelText("公司")).toBeRequired();
    expect(screen.getByLabelText("联系方式")).toBeRequired();
    expect(screen.getByLabelText("感兴趣的服务")).toBeInTheDocument();
    expect(screen.getByLabelText("需求描述")).toBeRequired();
    expect(screen.getByRole("link", { name: "隐私政策" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("button", { name: "提交咨询" })).toBeInTheDocument();
  });

  it("renders a concise privacy policy for consultation form data", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { level: 1, name: "隐私政策" })).toBeInTheDocument();
    expect(screen.getByText(/咨询表单会收集姓名、公司、联系方式、服务兴趣和需求描述/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "信息用途" })).toBeInTheDocument();
  });
});
