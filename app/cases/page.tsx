import Link from "next/link";
import { getBusinessCases, getServiceBySlug } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "服务案例",
  description: "映盛服务案例展示用户运营、社会化媒体营销和数字渠道建设等项目如何帮助品牌沉淀增长能力。",
  path: "/cases"
});

export default function CasesPage() {
  const cases = getBusinessCases();

  return (
    <main className="bg-[#f7f7f4] text-[#1c1c1a]">
      <section className="px-5 pb-14 pt-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold text-[#0f5b4f]">SERVICE CASES</p>
          <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">服务案例</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f6058]">
            用真实项目展示映盛如何把策略、内容、运营和数字阵地连接起来，帮助中大型品牌沉淀可复用的增长能力。
          </p>
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {cases.map((businessCase) => {
            const relatedService = getServiceBySlug(businessCase.relatedServiceSlug);
            const primaryMetric = businessCase.result.metrics?.[0];

            return (
              <article
                key={businessCase.slug}
                className="flex min-h-[420px] flex-col justify-between border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-[#0f5b4f]">{businessCase.client}</p>
                    {relatedService ? (
                      <span className="rounded-sm bg-[#edf5f2] px-3 py-1 text-xs font-medium text-[#0f5b4f]">{relatedService.title}</span>
                    ) : null}
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-normal text-[#1c1c1a]">
                    {businessCase.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#5f6058]">{businessCase.summary}</p>
                  {relatedService ? (
                    <p className="mt-5 text-sm font-medium text-[#32332e]">相关服务：{relatedService.title}</p>
                  ) : null}
                  <div className="mt-6 border-t border-black/10 pt-5">
                    <p className="text-xs font-semibold text-[#8a8d84]">案例结果</p>
                    <p className="mt-2 text-sm leading-6 text-[#4f504a]">{businessCase.result.summary}</p>
                    {primaryMetric ? (
                      <p className="mt-4 text-base font-semibold text-[#1c1c1a]">
                        {primaryMetric.label}：{primaryMetric.value}
                      </p>
                    ) : null}
                  </div>
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
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border border-black/10 bg-[#20231f] p-7 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">想了解类似项目如何落地？</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">从行业、目标人群和品牌阶段出发，映盛可以拆解适合你的服务路径。</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214]">
            咨询类似服务案例
          </Link>
        </div>
      </section>
    </main>
  );
}
