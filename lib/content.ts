import siteContent from "@/content/site.json";

export type NavigationItem = {
  label: string;
  href: string;
};

export type HomepageService = {
  title: string;
  summary: string;
  keywords: string[];
};

export function getPrimaryNavigation(): NavigationItem[] {
  return siteContent.primaryNavigation;
}

export function getHomepageServices(): HomepageService[] {
  return siteContent.homepageServices;
}
