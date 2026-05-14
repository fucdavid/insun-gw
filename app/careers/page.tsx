import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="bg-[#f6f9fc] text-[#172033]">
      <section className="relative overflow-hidden border-b border-[#dce6f2] px-5 pb-16 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(39,135,245,0.2),transparent_34%),linear-gradient(115deg,#ffffff_0%,#eef7ff_58%,#dceeff_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold text-[#1267e8]">JOIN INSUN</p>
          <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">加入我们</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#46566f]">
            加入映盛，适合愿意理解品牌、用户和内容的人。你会在真实项目中接触用户运营、社媒内容、口碑传播、公关活动和数字渠道建设。
          </p>
        </div>
      </section>

      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["真实项目", "参与中大型品牌的长期运营和专项营销项目，理解业务目标与用户反馈。"],
            ["复合能力", "在策略、内容、执行、数据、客户沟通之间建立完整的工作视角。"],
            ["成长机制", "通过项目复盘、方法沉淀和跨团队协作持续提升专业能力。"]
          ].map(([title, body]) => (
            <article key={title} className="border border-[#dce6f2] bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-normal">{title}</h2>
              <p className="mt-5 text-base leading-8 text-[#5a6880]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-[#dce6f2] bg-white p-7 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-normal">我们需要的方向</h2>
            <p className="mt-5 text-base leading-8 text-[#5a6880]">
              用户运营、社群运营、内容策划、社交媒体运营、短视频/直播运营、项目执行、客户服务、设计与数字产品相关岗位，都可能在映盛找到发挥空间。
            </p>
          </div>
          <div className="border border-[#dce6f2] bg-[#172033] p-7 text-white shadow-sm">
            <h2 className="text-3xl font-semibold tracking-normal">候选人关注</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              我们重视清晰表达、稳定交付、主动复盘和对用户真实需求的敏感度。无论你来自运营、内容、市场还是数字产品方向，都需要能把复杂问题拆成可执行动作。
            </p>
            <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214]">
              联系加入映盛
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
