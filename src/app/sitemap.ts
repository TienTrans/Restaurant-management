import dishesApiRequest from "@/apiRequests/dishes";
import envConfig from "@/config";
import { generateSlugUrl } from "@/lib/utils";
import type { MetadataRoute } from "next";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${envConfig.NEXT_PUBLIC_URL}`,
    changeFrequency: "daily",
    priority: 1,
    lastModified: new Date(),
  },
  {
    url: `${envConfig.NEXT_PUBLIC_URL}/login`,
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: new Date(),
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await dishesApiRequest.list();
  const dishList = result.payload.data;

  const dishListSiteMap: MetadataRoute.Sitemap = dishList.map((dish) => {
    return {
      url: `${envConfig.NEXT_PUBLIC_URL}/dishes/${generateSlugUrl({
        id: dish.id,
        name: dish.name,
      })}`,
      lastModified: dish.updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    };
  });

  return [...staticRoutes, ...dishListSiteMap];
}
