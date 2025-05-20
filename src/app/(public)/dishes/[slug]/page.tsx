import dishesApiRequest from "@/apiRequests/dishes";
import DishDetail from "@/app/(public)/dishes/[slug]/dish-detail";
import { getIdFromSlugUrl, wrapServerApi } from "@/lib/utils";
import envConfig from "@/config";
import { Metadata } from "next";

const url = `${envConfig.NEXT_PUBLIC_URL}/dishes/[slug]`;

export const generateMetadata = async (
  props: {
    params: Promise<{ slug: string }>;
  }
) => {
  const params = await props.params;
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

export default async function DishPage(
  props: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const data = await wrapServerApi(() =>
    dishesApiRequest.getDishDetail(Number(getIdFromSlugUrl(slug)))
  );

  const dish = data?.payload?.data;
  return <DishDetail dish={dish} />;
}
