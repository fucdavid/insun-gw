import siteContent from "@/content/site.json";

export type NavigationItem = {
  label: string;
  href: string;
};

export type HomepageService = {
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
  overview?: string;
  content?: string[];
  platforms?: string[];
  targetCustomers?: string[];
  modules?: Array<{
    name: string;
    description: string;
  }>;
  representativeClients?: string[];
};

export function getPrimaryNavigation(): NavigationItem[] {
  return siteContent.primaryNavigation;
}

export function getHomepageServices(): HomepageService[] {
  return siteContent.homepageServices;
}

export function getServiceBySlug(slug: string): HomepageService | undefined {
  return siteContent.homepageServices.find((service) => service.slug === slug);
}
