import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { ResearchArticle } from "@/lib/content";

const researchDirectory = path.join(process.cwd(), "content", "research");
const requiredFrontmatterFields = ["slug", "title", "category", "publishedAt", "readingTime", "summary"] as const;

export function getMarkdownResearchArticles(): ResearchArticle[] {
  return readdirSync(researchDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort()
    .map((fileName) => parseResearchArticleMarkdown(fileName, readFileSync(path.join(researchDirectory, fileName), "utf8")));
}

export function parseResearchArticleMarkdown(fileName: string, source: string): ResearchArticle {
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error(`Research article ${fileName} must start with frontmatter.`);
  }

  const frontmatter = parseFrontmatter(frontmatterMatch[1], fileName);
  const missingField = requiredFrontmatterFields.find((field) => !frontmatter[field]);

  if (missingField) {
    throw new Error(`Research article ${fileName} is missing required frontmatter field: ${missingField}.`);
  }

  const sections = parseMarkdownSections(frontmatterMatch[2], fileName);

  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    category: frontmatter.category,
    summary: frontmatter.summary,
    publishedAt: frontmatter.publishedAt,
    readingTime: frontmatter.readingTime,
    sections
  };
}

function parseFrontmatter(frontmatterSource: string, fileName: string) {
  return frontmatterSource.split(/\r?\n/).reduce<Record<string, string>>((fields, line) => {
    if (!line.trim()) return fields;
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      throw new Error(`Research article ${fileName} has invalid frontmatter line: ${line}.`);
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    fields[key] = value;
    return fields;
  }, {});
}

function parseMarkdownSections(markdownBody: string, fileName: string): ResearchArticle["sections"] {
  const sections: ResearchArticle["sections"] = [];
  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  for (const line of markdownBody.split(/\r?\n/)) {
    if (line.startsWith("## ")) {
      if (currentHeading) {
        sections.push({ heading: currentHeading, body: currentBody.join("\n").trim() });
      }
      currentHeading = line.replace(/^##\s+/, "").trim();
      currentBody = [];
      continue;
    }

    if (currentHeading && line.trim()) {
      currentBody.push(line.trim());
    }
  }

  if (currentHeading) {
    sections.push({ heading: currentHeading, body: currentBody.join("\n").trim() });
  }

  if (sections.length === 0 || sections.some((section) => !section.heading || !section.body)) {
    throw new Error(`Research article ${fileName} must contain Markdown sections with level-2 headings and body text.`);
  }

  return sections;
}
