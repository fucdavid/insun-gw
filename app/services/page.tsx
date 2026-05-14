import Link from "next/link";
import { getHomepageServices } from "@/lib/content";

export default function ServicesPage() {
  const services = getHomepageServices();

  return (
    <main className="bg-[#f6f9fc] text-[#172033]">
      <section className="relative overflow-hidden border-b border-[#dce6f2] px-5 pb-16 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(39,135,245,0.22),transparent_34%),linear-gradient(115deg,#ffffff_0%,#edf6ff_58%,#d9ecff_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-[#1267e8]">CORE SERVICES</p>
            <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">核心业务</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#46566f]">
              六大核心业务围绕真实用户关系展开，从公域获客、内容传播、用户运营到数字阵地建设，帮助品牌形成可持续增长闭环。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["用户关系", "内容资产", "数字阵地"].map((item) => (
              <div key={item} className="border border-white/70 bg-white/62 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-[#1267e8]">{item}</p>
                <p className="mt-3 text-sm leading-6 text-[#5a6880]">贯穿策略、执行、运营和复盘的服务能力。</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={service.slug} className="flex min-h-[360px] flex-col justify-between border border-[#dce6f2] bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-[#1267e8]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal text-[#172033]">{service.title}</h2>
                <p className="mt-4 text-base leading-7 text-[#5a6880]">{service.summary}</p>
                <p className="mt-5 text-sm leading-6 text-[#1267e8]">{service.keywords.slice(0, 4).join(" · ")}</p>
              </div>
              <Link
                href={`/services/${service.slug}`}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#172033] px-5 text-sm font-medium text-white transition hover:bg-[#2c374d]"
              >
                了解{service.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border border-[#dce6f2] bg-white p-7 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">需要组合多项服务？</h2>
            <p className="mt-3 text-sm leading-6 text-[#5a6880]">映盛可按品牌阶段、目标人群和业务系统现状，组合用户运营、内容传播和数字渠道能力。</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#1267e8] px-6 text-base font-medium text-white transition hover:bg-[#0d53bd]"
          >
            咨询适合的业务组合
          </Link>
        </div>
      </section>
    </main>
  );
}
