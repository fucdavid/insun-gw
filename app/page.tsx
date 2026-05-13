import Link from "next/link";
import { HomepagePanel } from "@/components/homepage-panel";
import { getHomepageServices } from "@/lib/content";

export default function HomePage() {
  const services = getHomepageServices();

  return (
    <main className="snap-y snap-proximity bg-[#101214]">
      <HomepagePanel id="home" label="首页首屏" backgroundImage="/home/hero.png">
        <div className="max-w-5xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.4em] text-white/70">INSUN Digital Growth</p>
          <h1
            aria-label="让品牌增长，回到真实用户关系"
            className="text-5xl font-black leading-tight tracking-normal text-white md:text-8xl"
          >
            让品牌增长，
            <br />
            回到真实用户关系
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/78">
            映盛面向中大型品牌，提供用户运营、口碑营销、社会化媒体营销、直播/短视频营销、互动公关与数字渠道建设服务，帮助品牌实现从公域获客到私域转化的长效增长。
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214] transition hover:bg-white/86"
            >
              咨询合作
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/40 px-6 text-base font-medium text-white transition hover:border-white"
            >
              查看核心业务
            </Link>
            <Link
              href="/cases"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-transparent px-6 text-base font-medium text-white/82 transition hover:text-white"
            >
              查看服务案例
            </Link>
          </div>
        </div>
      </HomepagePanel>

      <HomepagePanel id="services" label="核心业务" backgroundImage="/home/services.png" align="left">
        <div className="w-full">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-medium tracking-[0.28em] text-white/70">CORE SERVICES</p>
            <h2 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">围绕真实用户关系的增长服务</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="border-t border-white/30 pt-5">
                <h2 className="text-2xl font-semibold tracking-normal text-white">
                  <Link href={`/services/${service.slug}`} className="transition hover:text-white/70">
                    {service.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/72">{service.summary}</p>
                <p className="mt-2 text-xs leading-6 text-white/60">{service.keywords.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </HomepagePanel>

      <HomepagePanel id="cases" label="服务案例" backgroundImage="/home/cases.png" align="left">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-[0.28em] text-white/70">SERVICE CASES</p>
          <h2 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">从真实项目里看增长路径</h2>
          <p className="mt-6 text-lg leading-8 text-white/75">以客户背景、挑战、解决方案、执行内容和结果影响组织案例，让潜在客户和 AI/search 都能理解映盛的服务价值。</p>
          <Link href="/cases" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214]">
            查看服务案例
          </Link>
        </div>
      </HomepagePanel>

      <HomepagePanel id="research" label="映盛研究院" backgroundImage="/home/research.png" align="left">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-[0.28em] text-white/70">RESEARCH INSTITUTE</p>
          <h2 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">把行业洞察沉淀成品牌增长方法</h2>
          <p className="mt-6 text-lg leading-8 text-white/75">映盛研究院承载行业洞察、营销方法论、平台趋势和品牌增长研究，不做普通公司新闻。</p>
          <Link href="/research" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm border border-white/45 px-6 text-base font-medium text-white">
            进入研究院
          </Link>
        </div>
      </HomepagePanel>

      <HomepagePanel id="about" label="关于映盛" backgroundImage="/home/about.png" align="left">
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-medium tracking-[0.28em] text-white/70">ABOUT INSUN</p>
          <h2 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">汽车行业经验，服务多元中大型品牌</h2>
          <p className="mt-6 text-lg leading-8 text-white/75">
            深耕汽车行业，同时服务消费品、金融、旅游等中大型品牌。官网将持续作为潜在客户、AI/search 爬虫和候选人理解映盛的权威入口。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/about" className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/45 px-6 text-base font-medium text-white">
              关于映盛
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214]">
              咨询合作
            </Link>
          </div>
        </div>
      </HomepagePanel>
    </main>
  );
}
