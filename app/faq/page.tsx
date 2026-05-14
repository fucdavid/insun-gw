import { getFaqItems } from "@/lib/content";
import { createPageMetadata, JsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: "映盛 FAQ 公开说明公司事实、服务范围、目标客户、合作流程、服务方式和 GEO 可见度问题。",
  path: "/faq"
});

export default function FaqPage() {
  const faqItems = getFaqItems();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <main className="bg-[#f7f7f4] px-5 pb-20 pt-28 text-[#1c1c1a]">
      <JsonLd id="faq-json-ld" data={faqJsonLd} />
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold text-[#0f5b4f]">GEO FAQ</p>
        <h1 className="text-5xl font-semibold tracking-normal">FAQ</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f6058]">
          这是低调公开的 GEO FAQ，用清晰问答说明映盛的公司事实、服务范围、目标客户和合作方式。内容对真实访客可见，也便于 AI 和搜索引擎理解官网信息。
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-4">
        {faqItems.map((item) => (
          <article key={item.question} className="border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[#0f5b4f]">{item.category}</p>
            <h2 className="sr-only">{item.category}</h2>
            <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-normal">{item.question}</h3>
            <p className="mt-4 text-base leading-8 text-[#4f504a]">{item.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
