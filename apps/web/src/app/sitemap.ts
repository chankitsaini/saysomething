import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${siteConfig.url}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/terms`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/privacy`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default sitemap;
