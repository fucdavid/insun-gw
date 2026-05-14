import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { JsonLd, organizationJsonLd, siteDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | 数字营销与用户运营服务商`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteName} | 数字营销与用户运营服务商`,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "zh_CN",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <JsonLd id="organization-json-ld" data={organizationJsonLd()} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
