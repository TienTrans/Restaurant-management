import dishesApiRequest from "@/apiRequests/dishes";
import DishDetail from "@/app/(public)/dishes/[slug]/dish-detail";
import { getIdFromSlugUrl, wrapServerApi } from "@/lib/utils";
import envConfig from "@/config";
import { Metadata } from "next";

const url = `${envConfig.NEXT_PUBLIC_URL}/dishes/[slug]`;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const data = await wrapServerApi(() =>
    dishesApiRequest.getDishDetail(Number(getIdFromSlugUrl(params.slug)))
  );
  return {
    title: data?.payload?.data?.name,
    description: data?.payload?.data?.description,
    alternates: {
      canonical: url,
    },
  };
};

export default async function DishPage({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const data = await wrapServerApi(() =>
    dishesApiRequest.getDishDetail(Number(getIdFromSlugUrl(slug)))
  );

  const dish = data?.payload?.data;
  return <DishDetail dish={dish} />;
}
