import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "隐私政策",
  description: "映盛官网咨询表单的信息收集、使用、保存、更正和删除说明。",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <main className="bg-[#f7f7f4] px-5 pb-20 pt-28 text-[#1c1c1a]">
      <article className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold text-[#0f5b4f]">PRIVACY</p>
        <h1 className="text-5xl font-semibold tracking-normal">隐私政策</h1>
        <p className="mt-6 text-lg leading-8 text-[#5f6058]">
          咨询表单会收集姓名、公司、联系方式、服务兴趣和需求描述，用于判断合作需求、安排商务沟通和回复咨询问题。
        </p>

        <section className="mt-10 border border-black/10 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-normal">信息用途</h2>
          <p className="mt-4 text-base leading-8 text-[#4f504a]">
            映盛仅将咨询信息用于业务沟通、需求评估、服务方案建议和后续联系，不会将咨询信息出售给第三方。
          </p>
        </section>
        <section className="mt-6 border border-black/10 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-normal">信息保存与更正</h2>
          <p className="mt-4 text-base leading-8 text-[#4f504a]">
            如果你希望更正或删除已提交的咨询信息，可以通过官网联系方式联系映盛，我们会在合理时间内处理。
          </p>
        </section>
      </article>
    </main>
  );
}
