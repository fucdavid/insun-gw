import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "映盛文化",
  description: "映盛文化重视真实用户关系、专业交付、内容共创、数据复盘和团队长期成长。",
  path: "/culture"
});

export default function CulturePage() {
  return (
    <main className="bg-[#f7f7f4] text-[#1c1c1a]">
      <section className="px-5 pb-14 pt-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold text-[#0f5b4f]">INSUN CULTURE</p>
          <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">映盛文化</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f6058]">
            映盛文化围绕真实用户关系、专业交付和长期成长展开。我们重视对行业、品牌和用户的持续理解，也重视团队在真实项目中的协作和复盘。
          </p>
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["真实", "从真实用户体验、真实内容和真实业务问题出发，避免空泛传播。"],
            ["专业", "用策略、执行、数据和复盘保证项目结果可解释、可沉淀、可迭代。"],
            ["共创", "在品牌、用户、达人、媒体和内部团队之间建立更高效的协作方式。"]
          ].map(([title, body]) => (
            <article key={title} className="border border-black/10 bg-white p-7 shadow-sm">
              <h2 className="text-3xl font-semibold tracking-normal">{title}</h2>
              <p className="mt-5 text-base leading-8 text-[#5f6058]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border border-black/10 bg-[#20231f] p-7 text-white shadow-sm">
            <h2 className="text-3xl font-semibold tracking-normal">工作方式</h2>
            <p className="mt-5 text-base leading-8 text-white/70">
              我们以项目目标为牵引，强调清晰分工、快速响应、内容质量和持续复盘。每一次交付都要能回答为什么做、怎么做、结果如何、下一步如何优化。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["策略先行", "内容共创", "数据复盘", "长期学习"].map((item) => (
              <p key={item} className="border border-black/10 bg-white p-5 text-base font-semibold shadow-sm">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="border border-black/10 bg-white p-7 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-normal">员工活动</h2>
            <p className="mt-5 text-base leading-8 text-[#5f6058]">
              团队活动围绕项目复盘、案例分享、跨岗位协作和阶段性团队共创展开，让运营、内容、设计、技术和客户服务角色能在真实项目中互相理解。
            </p>
          </article>
          <article className="border border-black/10 bg-white p-7 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-normal">办公环境</h2>
            <p className="mt-5 text-base leading-8 text-[#5f6058]">
              映盛强调安静、开放和面向交付的工作环境。办公协作以清晰沟通、资料沉淀、快速响应和高质量内容产出为核心。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
