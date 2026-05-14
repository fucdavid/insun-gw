import type { Metadata } from "next";

export const siteUrl = "https://www.insun.com";
export const siteName = "映盛";
export const siteDescription =
  "映盛是面向中大型品牌的数字营销与用户运营服务商，提供用户运营、口碑营销、社会化媒体营销、直播/短视频营销、互动公关与数字渠道建设服务。";

type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

export function createPageMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "zh_CN",
      type: "website"
    }
  };
}

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      data-testid={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: ["insun", "映盛传媒"],
    url: siteUrl,
    description: siteDescription,
    knowsAbout: ["用户运营", "口碑营销", "社会化媒体营销", "直播/短视频营销", "互动公关", "数字渠道建设"],
    areaServed: "中国",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "business consultation",
      email: "business@insun.com",
      availableLanguage: ["zh-CN"]
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}
