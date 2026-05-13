import Link from "next/link";
import { getHomepageServices } from "@/lib/content";

export default function HomePage() {
  const services = getHomepageServices();

  return (
    <main>
      <section aria-label="首页首屏" className="mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-5 py-20">
        <p className="mb-5 text-sm font-medium text-[#0f5b4f]">映盛 · 数字营销与用户运营服务商</p>
        <h1 className="max-w-5xl text-5xl font-semibold leading-tight tracking-normal text-[#1c1c1a] md:text-7xl">
          让品牌增长，回到真实用户关系
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-[#55564f]">
          映盛面向中大型品牌，提供用户运营、口碑营销、社会化媒体营销、直播/短视频营销、互动公关与数字渠道建设服务，帮助品牌实现从公域获客到私域转化的长效增长。
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#0f5b4f] px-6 text-base font-medium text-white transition hover:bg-[#0b463d]"
          >
            咨询合作
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#1c1c1a]/20 px-6 text-base font-medium text-[#1c1c1a] transition hover:border-[#0f5b4f] hover:text-[#0f5b4f]"
          >
            查看核心业务
          </Link>
          <Link
            href="/cases"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-transparent px-6 text-base font-medium text-[#3b3b35] transition hover:text-[#0f5b4f]"
          >
            查看服务案例
          </Link>
        </div>
      </section>
      <section className="border-t border-black/10 bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-[#0f5b4f]">核心业务</p>
            <h2 className="text-4xl font-semibold tracking-normal text-[#1c1c1a]">围绕真实用户关系的增长服务</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="border-t border-black/15 pt-7">
                <h2 className="text-3xl font-semibold tracking-normal text-[#1c1c1a]">
                  <Link href={`/services/${service.slug}`} className="transition hover:text-[#0f5b4f]">
                    {service.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-7 text-[#55564f]">{service.summary}</p>
                <p className="mt-3 text-sm leading-7 text-[#2f302c]">{service.keywords.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f7f7f4] px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-black/10 py-12 md:grid-cols-[1fr_2fr] md:items-center">
          <p className="text-sm font-medium text-[#0f5b4f]">优势行业</p>
          <p className="text-2xl font-semibold leading-snug tracking-normal text-[#1c1c1a]">
            深耕汽车行业，同时服务消费品、金融、旅游等中大型品牌。
          </p>
        </div>
      </section>
    </main>
  );
}
