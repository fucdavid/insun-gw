import Link from "next/link";
import { getResearchArticles } from "@/lib/content";

export default function ResearchPage() {
  const articles = getResearchArticles();
  const categories = Array.from(new Set(articles.map((article) => article.category)));

  return (
    <main className="bg-[#f7f7f4] px-5 pb-20 pt-28">
      <section className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-medium text-[#0f5b4f]">Research Institute</p>
        <h1 className="text-5xl font-semibold tracking-normal text-[#1c1c1a]">映盛研究院</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f6058]">
          映盛研究院承载行业洞察、营销方法论、平台趋势和品牌增长研究，用可爬取的专业内容沉淀品牌增长知识。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-sm border border-black/10 bg-white px-4 py-2 text-sm text-[#32332e]">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.slug} className="flex min-h-[300px] flex-col justify-between border border-black/10 bg-white p-7 shadow-sm">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#687064]">
                <span className="font-medium text-[#0f5b4f]">{article.category}</span>
                <span>{article.publishedAt}</span>
                <span>{article.readingTime}</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal text-[#1c1c1a]">{article.title}</h2>
              <p className="mt-4 text-base leading-7 text-[#5f6058]">{article.summary}</p>
            </div>
            <Link
              href={`/research/${article.slug}`}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#20231f] px-5 text-sm font-medium text-white transition hover:bg-[#33362f]"
            >
              阅读{article.title}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
