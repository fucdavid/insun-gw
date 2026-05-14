import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getClientLogoDataUri } from "@/lib/client-logo";
import { getHomepageServices, getServiceBySlug } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata, JsonLd } from "@/lib/seo";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const operationModel = ["公域获客", "私域沉淀", "用户分层", "内容共创", "转化复购", "转介绍增长"];

export function generateStaticParams() {
  return getHomepageServices().map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const modules = service.modules ?? service.keywords.map((keyword) => ({ name: keyword, description: service.summary }));
  const breadcrumb = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "核心业务", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` }
  ]);

  return (
    <main className="bg-[#f6f9fc] text-[#172033]">
      <JsonLd id="breadcrumb-json-ld" data={breadcrumb} />
      <section className="relative overflow-hidden border-b border-[#dce6f2] px-5 pb-16 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(39,135,245,0.22),transparent_34%),linear-gradient(115deg,#ffffff_0%,#edf6ff_56%,#d9ecff_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="mb-4 text-sm font-semibold text-[#1267e8]">核心业务</p>
            <h1 className="text-5xl font-semibold tracking-normal text-[#172033] md:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#46566f]">{service.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#1267e8] px-6 text-base font-medium text-white transition hover:bg-[#0d53bd]"
              >
                咨询合作
              </Link>
              <Link
                href="/cases"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#1267e8]/45 bg-white/70 px-6 text-base font-medium text-[#1267e8] transition hover:border-[#1267e8]"
              >
                查看案例
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-md border border-white/70 bg-white/50 p-3 shadow-[0_24px_80px_rgba(18,103,232,0.16)]">
            <img
              src="/home/services.png"
              alt={`${service.title}服务场景`}
              className="h-[360px] w-full rounded-sm object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto max-w-7xl rounded-md border border-[#dce6f2] bg-white p-7 shadow-sm md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#172033]">服务内容</h2>
              <p className="mt-4 text-base leading-7 text-[#5a6880]">{service.overview ?? service.summary}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {(service.content ?? [service.summary]).map((item, index) => (
                <article key={item} className="border-l-2 border-[#1267e8] bg-[#f7fbff] p-5">
                  <p className="text-sm font-semibold text-[#1267e8]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-sm leading-6 text-[#43516a]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14">
        <div className="mx-auto max-w-7xl rounded-md border border-[#dce6f2] bg-white p-7 shadow-sm md:p-9">
          <h2 className="text-2xl font-semibold tracking-normal text-[#172033]">全链路运营模型</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-6">
            {operationModel.map((step, index) => (
              <div key={step} className="relative rounded-sm border border-[#dce6f2] bg-[#f7fbff] p-4">
                <p className="text-xs font-semibold text-[#1267e8]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-base font-semibold text-[#172033]">{step}</p>
                {index < operationModel.length - 1 ? (
                  <span className="absolute right-[-10px] top-1/2 hidden h-px w-5 bg-[#1267e8]/50 md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <InfoPanel title="服务平台">
            <div className="flex flex-wrap gap-3">
              {(service.platforms ?? service.keywords).map((platform) => (
                <span key={platform} className="rounded-sm border border-[#dce6f2] bg-white px-4 py-3 text-sm text-[#43516a]">
                  {platform}
                </span>
              ))}
            </div>
          </InfoPanel>
          <InfoPanel title="服务对象">
            <div className="grid gap-3 sm:grid-cols-2">
              {(service.targetCustomers ?? ["中大型企业品牌及子品牌"]).map((target) => (
                <p key={target} className="rounded-sm border border-[#dce6f2] bg-white px-4 py-3 text-sm leading-6 text-[#43516a]">
                  {target}
                </p>
              ))}
            </div>
          </InfoPanel>
        </div>
      </section>

      <section className="px-5 pb-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold tracking-normal text-[#172033]">业务模块</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <article key={module.name} className="min-h-40 rounded-md border border-[#dce6f2] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#172033]">{module.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5a6880]">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-md border border-[#dce6f2] bg-white p-7 shadow-sm md:p-9">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#172033]">服务客户</h2>
              <p className="mt-3 text-sm leading-6 text-[#5a6880]">覆盖汽车、消费品、金融等中大型品牌，沉淀可复用的服务经验。</p>
            </div>
            <Link href="/cases" className="text-sm font-semibold text-[#1267e8]">
              查看更多案例
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {(service.representativeClients ?? []).map((client) => (
              <div key={client} className="flex min-h-24 items-center justify-center rounded-sm border border-[#dce6f2] bg-[#fbfdff] p-4">
                <img src={getClientLogoDataUri(client)} alt={`${client} logo`} className="h-14 w-full object-contain" />
                <span className="sr-only">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-md border border-[#dce6f2] bg-[#eef6ff] p-7 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-normal text-[#172033]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
