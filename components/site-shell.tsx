import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { getPrimaryNavigation } from "@/lib/content";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const primaryNavigation = getPrimaryNavigation();

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#1c1c1a]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/25 text-white backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-5 py-4 md:px-12">
          <Link href="/" aria-label="首页" className="inline-flex items-center">
            <BrandLogo />
          </Link>
          <nav aria-label="主导航" className="hidden items-center gap-6 text-sm md:flex">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/78 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center justify-center rounded-sm border border-white/35 px-4 text-sm font-medium text-white transition hover:border-white"
          >
            咨询合作
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-black/10 bg-[#20231f] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/70">映盛 · 数字营销与用户运营服务商</p>
          <Link href="/contact" className="text-sm font-medium text-white">
            咨询合作
          </Link>
        </div>
      </footer>
    </div>
  );
}
