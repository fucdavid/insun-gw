import siteContent from "@/content/site.json";

export type NavigationItem = {
  label: string;
  href: string;
};

export function getPrimaryNavigation(): NavigationItem[] {
  return siteContent.primaryNavigation;
}
