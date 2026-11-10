import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://iamashraf.in";
  const now = new Date();

  return [
    { url: `${base}/travel`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/travel/destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/travel/destinations/kashmir`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/travel/destinations/ladakh`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/travel/destinations/rajasthan`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/travel/destinations/meghalaya`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/travel/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/travel/stories/kashmir-heaven-on-earth`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/travel/stories/ladakh-land-of-high-passes`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/travel/stories/meghalaya-abode-of-clouds`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/travel/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/travel/guides/kashmir`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/travel/guides/ladakh`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/travel/guides/rajasthan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/travel/guides/kashmir-winter-expedition-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/travel/guides/ladakh-high-passes-circuit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/travel/guides/rajasthan-royal-desert-trail`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/travel/reels`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/travel/trips`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/travel/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/travel/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/travel/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
  ];
}
