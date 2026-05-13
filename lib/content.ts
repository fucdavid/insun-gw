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

export type BusinessCase = {
  slug: string;
  title: string;
  client: string;
  relatedServiceSlug: string;
  summary: string;
  background: string;
  challenge: string;
  solution: string;
  execution: string[];
  result: {
    summary: string;
    metrics?: Array<{
      label: string;
      value: string;
    }>;
  };
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

export function getBusinessCases(): BusinessCase[] {
  return siteContent.businessCases;
}

export function getBusinessCaseBySlug(slug: string): BusinessCase | undefined {
  return siteContent.businessCases.find((businessCase) => businessCase.slug === slug);
}
