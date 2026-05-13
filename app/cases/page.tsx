import Link from "next/link";
import { getBusinessCases, getServiceBySlug } from "@/lib/content";

export default function CasesPage() {
  const cases = getBusinessCases();

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      <h1 className="text-4xl font-semibold tracking-normal text-[#1c1c1a]">服务案例</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6058]">
        服务案例将展示客户背景、挑战、解决方案、执行内容和结果影响。
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cases.map((businessCase) => {
          const relatedService = getServiceBySlug(businessCase.relatedServiceSlug);

          return (
            <article
              key={businessCase.slug}
              className="flex min-h-[280px] flex-col justify-between border border-black/10 bg-white p-6 shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-[#0f5b4f]">{businessCase.client}</p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-normal text-[#1c1c1a]">
                  {businessCase.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#5f6058]">{businessCase.summary}</p>
                {relatedService ? (
                  <p className="mt-5 text-sm font-medium text-[#32332e]">相关服务：{relatedService.title}</p>
                ) : null}
              </div>
              <Link
                href={`/cases/${businessCase.slug}`}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#101214] px-4 text-sm font-medium text-white transition hover:bg-[#30332e]"
              >
                查看{businessCase.title}案例
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
