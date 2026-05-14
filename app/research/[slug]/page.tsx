import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearchArticleBySlug, getResearchArticles } from "@/lib/content";

type ResearchArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getResearchArticles().map((article) => ({ slug: article.slug }));
}

export default async function ResearchArticlePage({ params }: ResearchArticlePageProps) {
  const { slug } = await params;
  const article = getResearchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-[#f7f7f4] px-5 pb-20 pt-28">
      <article className="mx-auto max-w-4xl">
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

        <div className="mt-12 space-y-10 border-t border-black/10 pt-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1c1c1a]">{section.heading}</h2>
              <p className="mt-4 text-lg leading-9 text-[#4f504a]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
