import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "映盛官网",
  description: "映盛是面向中大型品牌的数字营销与用户运营服务商。"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
