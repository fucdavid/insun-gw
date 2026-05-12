import Link from "next/link";
import type { ReactNode } from "react";
import { getPrimaryNavigation } from "@/lib/content";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const primaryNavigation = getPrimaryNavigation();

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#1c1c1a]">
      <header className="border-b border-black/10 bg-[#f7f7f4]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-semibold tracking-normal">
            映盛
          </Link>
          <nav aria-label="主导航" className="hidden items-center gap-6 text-sm md:flex">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-[#3b3b35] transition hover:text-[#0f5b4f]">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center justify-center rounded-sm bg-[#0f5b4f] px-4 text-sm font-medium text-white transition hover:bg-[#0b463d]"
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
