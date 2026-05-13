import Link from "next/link";
import { notFound } from "next/navigation";
import { getClientLogoDataUri } from "@/lib/client-logo";
import { getHomepageServices, getServiceBySlug } from "@/lib/content";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getHomepageServices().map((service) => ({
    slug: service.slug
  }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="mb-4 text-sm font-medium text-[#0f5b4f]">核心业务</p>
        <h1 className="text-5xl font-semibold tracking-normal text-[#1c1c1a]">{service.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#55564f]">{service.overview ?? service.summary}</p>
        <Link
          href="/contact"
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#0f5b4f] px-6 text-base font-medium text-white transition hover:bg-[#0b463d]"
        >
          咨询合作
        </Link>
      </section>

      <section className="border-t border-black/10 bg-white px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <DetailBlock title="服务内容" items={service.content ?? [service.summary]} />
          <DetailBlock title="服务平台" items={service.platforms ?? service.keywords} />
          <DetailBlock title="服务对象" items={service.targetCustomers ?? ["中大型企业品牌及子品牌"]} />
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">业务模块</h2>
            <div className="mt-5 space-y-5">
              {(service.modules ?? service.keywords.map((keyword) => ({ name: keyword, description: service.summary }))).map(
                (module) => (
                  <article key={module.name} className="border-t border-black/10 pt-4">
                    <h3 className="text-lg font-semibold text-[#1c1c1a]">{module.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f6058]">{module.description}</p>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f4] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">代表客户</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {(service.representativeClients ?? []).map((client) => (
              <div key={client} className="flex min-h-24 items-center justify-center rounded-sm border border-black/10 bg-white p-4">
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

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">{title}</h2>
      <ul className="mt-5 space-y-3 text-base leading-7 text-[#55564f]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
