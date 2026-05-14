import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearchArticleBySlug, getResearchArticles } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata, JsonLd, siteName, siteUrl } from "@/lib/seo";

type ResearchArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getResearchArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ResearchArticlePageProps) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/research/${article.slug}`
  });
}

export default async function ResearchArticlePage({ params }: ResearchArticlePageProps) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "映盛研究院"
    },
    publisher: {
      "@type": "Organization",
      name: siteName
    },
    mainEntityOfPage: `${siteUrl}/research/${article.slug}`,
    articleSection: article.category
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "映盛研究院", path: "/research" },
    { name: article.title, path: `/research/${article.slug}` }
  ]);

  return (
    <main className="bg-[#f7f7f4] px-5 pb-20 pt-28 text-[#1c1c1a]">
      <JsonLd id="article-json-ld" data={articleJsonLd} />
      <JsonLd id="breadcrumb-json-ld" data={breadcrumb} />
      <article className="mx-auto max-w-5xl">
        <header className="border border-black/10 bg-white p-7 shadow-sm md:p-9">
          <Link href="/research" className="text-sm font-medium text-[#0f5b4f]">
            返回映盛研究院
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#687064]">
            <span className="font-medium text-[#0f5b4f]">{article.category}</span>
            <span>{article.publishedAt}</span>
            <span>{article.readingTime}</span>
          </div>
          <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-normal text-[#1c1c1a]">{article.title}</h1>
          <p className="mt-6 text-xl leading-8 text-[#5f6058]">{article.summary}</p>
        </header>

        <section className="mt-8 border border-black/10 bg-[#20231f] p-7 text-white shadow-sm">
          <h2 className="text-2xl font-semibold tracking-normal">文章导读</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {article.sections.map((section) => (
              <li key={section.heading} className="border border-white/15 p-4 text-sm leading-6 text-white/76">
                {section.heading}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading} className="border border-black/10 bg-white p-7 shadow-sm md:p-9">
              <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">{section.heading}</h2>
              <p className="mt-4 text-lg leading-9 text-[#4f504a]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
