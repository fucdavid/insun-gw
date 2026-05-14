import Link from "next/link";
import { getResearchArticles } from "@/lib/content";

export default function ResearchPage() {
  const articles = getResearchArticles();
  const categories = Array.from(new Set(articles.map((article) => article.category)));
  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1);

  return (
    <main className="bg-[#f7f7f4] text-[#1c1c1a]">
      <section className="px-5 pb-14 pt-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-[#0f5b4f]">RESEARCH INSTITUTE</p>
            <h1 className="text-5xl font-semibold tracking-normal md:text-6xl">映盛研究院</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f6058]">
              映盛研究院承载行业洞察、营销方法论、平台趋势和品牌增长研究，用可爬取的专业内容沉淀品牌增长知识。
            </p>
          </div>
          <section className="border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-normal">专题分类</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span key={category} className="rounded-sm border border-black/10 bg-[#f7f7f4] px-4 py-2 text-sm text-[#32332e]">
                  {category}
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border border-black/10 bg-[#20231f] p-7 text-white shadow-sm md:p-9">
            <h2 className="text-2xl font-semibold tracking-normal text-white/86">推荐阅读</h2>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal">{featuredArticle.title}</h2>
            <p className="mt-5 text-base leading-8 text-white/72">{featuredArticle.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
              <span>{featuredArticle.category}</span>
              <span>{featuredArticle.publishedAt}</span>
              <span>{featuredArticle.readingTime}</span>
            </div>
            <Link
              href={`/research/${featuredArticle.slug}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-white px-6 text-base font-semibold text-[#101214]"
            >
              阅读{featuredArticle.title}
            </Link>
          </article>

          <div className="grid gap-4">
            {secondaryArticles.map((article) => (
              <article key={article.slug} className="border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#687064]">
                  <span className="font-medium text-[#0f5b4f]">{article.category}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-normal">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5f6058]">{article.summary}</p>
                <Link href={`/research/${article.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#0f5b4f]">
                  阅读{article.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
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
        </div>
      </section>
    </main>
  );
}
