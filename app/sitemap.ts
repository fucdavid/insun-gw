import type { MetadataRoute } from "next";
import { getBusinessCases, getHomepageServices, getResearchArticles } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

const staticRoutes = ["/", "/services", "/cases", "/research", "/culture", "/about", "/careers", "/faq", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = getHomepageServices().map((service) => `/services/${service.slug}`);
  const caseRoutes = getBusinessCases().map((businessCase) => `/cases/${businessCase.slug}`);
  const researchRoutes = getResearchArticles().map((article) => `/research/${article.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...caseRoutes, ...researchRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-05-14"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/faq" ? 0.7 : 0.8
  }));
}
