import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "关于映盛",
  description: "了解映盛的公司定位、服务对象、服务方式和围绕真实用户关系的数字营销与用户运营能力。",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="bg-[#f7f7f4] text-[#1c1c1a]">
      <section className="px-5 pb-14 pt-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold text-[#0f5b4f]">ABOUT INSUN</p>
          <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">关于映盛</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f6058]">
            映盛是面向中大型品牌的数字营销与用户运营服务商，长期围绕真实用户关系、内容资产和数字渠道建设，为品牌提供从策略到执行的整合服务。
          </p>
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-black/10 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-normal">公司定位</h2>
            <p className="mt-5 text-base leading-8 text-[#4f504a]">
              映盛关注品牌与真实用户之间的长期关系，不只追求一次传播声量，也重视用户沉淀、内容共创、社群互动、数字触点和复盘优化形成的持续增长能力。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["服务行业", "汽车、消费品、金融、旅游等中大型品牌及子品牌"],
              ["服务对象", "市场、品牌、用户运营、数字化和公关传播团队"],
              ["服务方式", "策略咨询、项目执行、阵地运营、系统建设与持续迭代"],
              ["核心价值", "让品牌增长回到真实用户关系和可复用资产"]
            ].map(([title, body]) => (
              <article key={title} className="border border-black/10 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold tracking-normal">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#5f6058]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto mb-6 grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            [
              "发展与沉淀",
              "映盛长期围绕汽车、消费品、金融、旅游等行业的品牌增长议题沉淀方法，服务从内容传播、用户运营到数字阵地建设的完整链路。"
            ],
            [
              "优势行业",
              "汽车行业是映盛重点服务和经验积累较深的方向，同时能力可延展至消费品、金融、旅游等需要长期用户关系经营的行业。"
            ],
            [
              "资质与荣誉说明",
              "官网不展示未经核验的资质、奖项或荣誉信息。涉及企业资质、项目授权或客户背书时，以双方确认后的正式材料为准。"
            ]
          ].map(([title, body]) => (
            <article key={title} className="border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-normal">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#5f6058]">{body}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-7xl border border-black/10 bg-[#20231f] p-7 text-white md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-normal">服务能力</h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                围绕用户运营、口碑营销、社会化媒体营销、直播/短视频营销、互动公关与数字渠道建设，映盛为品牌搭建从公域触达到私域沉淀的增长链路。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["真实用户运营", "内容传播资产", "数字渠道建设"].map((item) => (
                <p key={item} className="border border-white/15 p-4 text-sm font-medium text-white/86">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214]">
            咨询映盛服务
          </Link>
        </div>
      </section>
    </main>
  );
}
