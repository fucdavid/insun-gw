import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessCaseBySlug, getBusinessCases, getServiceBySlug } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "@/lib/seo";

type CaseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBusinessCases().map((businessCase) => ({ slug: businessCase.slug }));
}

export async function generateMetadata({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const businessCase = getBusinessCaseBySlug(slug);

  if (!businessCase) {
    return {};
  }

  return createPageMetadata({
    title: businessCase.title,
    description: businessCase.summary,
    path: `/cases/${businessCase.slug}`
  });
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const businessCase = getBusinessCaseBySlug(slug);

  if (!businessCase) {
    notFound();
  }

  const relatedService = getServiceBySlug(businessCase.relatedServiceSlug);
  const breadcrumb = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "服务案例", path: "/cases" },
    { name: businessCase.title, path: `/cases/${businessCase.slug}` }
  ]);

  return (
    <main className="bg-[#f7f7f4] pb-20 pt-28">
      <JsonLd id="breadcrumb-json-ld" data={breadcrumb} />
      <section className="mx-auto max-w-7xl px-5">
        <p className="mb-4 text-sm font-medium text-[#0f5b4f]">服务案例</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-[#1c1c1a]">
          {businessCase.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f6058]">{businessCase.summary}</p>
        {relatedService ? <p className="mt-5 text-sm font-medium text-[#32332e]">相关服务：{relatedService.title}</p> : null}
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="border border-black/10 bg-white p-7">
          <p className="text-sm font-medium text-[#0f5b4f]">客户背景</p>
          <p className="mt-4 text-base leading-7 text-[#4f504a]">{businessCase.background}</p>
        </aside>

        <div className="space-y-6">
          <StorySection title="挑战">{businessCase.challenge}</StorySection>
          <StorySection title="解决方案">{businessCase.solution}</StorySection>
          <section className="border border-black/10 bg-white p-7">
            <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">执行内容</h2>
            <ul className="mt-5 space-y-3">
              {businessCase.execution.map((item) => (
                <li key={item} className="border-l-2 border-[#0f5b4f] pl-4 text-base leading-7 text-[#4f504a]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="border border-black/10 bg-[#20231f] p-7 text-white">
            <h2 className="text-2xl font-semibold tracking-normal">案例结果</h2>
            <p className="mt-5 text-base leading-7 text-white/76">{businessCase.result.summary}</p>
            {businessCase.result.metrics?.length ? (
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {businessCase.result.metrics.map((metric) => (
                  <div key={metric.label} className="border border-white/15 p-4">
                    <dt className="text-sm text-white/60">{metric.label}</dt>
                    <dd className="mt-2 text-lg font-semibold">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </section>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-5">
        <div className="flex flex-col gap-4 border border-black/10 bg-white p-7 md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-semibold text-[#1c1c1a]">想了解类似项目如何落地？</p>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#0f5b4f] px-6 text-base font-medium text-white"
          >
            咨询类似项目
          </Link>
        </div>
      </section>
    </main>
  );
}

function StorySection({ title, children }: { title: string; children: string }) {
  return (
    <section className="border border-black/10 bg-white p-7">
      <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">{title}</h2>
      <p className="mt-5 text-base leading-7 text-[#4f504a]">{children}</p>
    </section>
  );
}
