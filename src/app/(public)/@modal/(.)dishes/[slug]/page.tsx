import dishesApiRequest from "@/apiRequests/dishes";
import Modal from "@/app/(public)/@modal/(.)dishes/[slug]/modal";
import DishDetail from "@/app/(public)/dishes/[slug]/dish-detail";
import { getIdFromSlugUrl, wrapServerApi } from "@/lib/utils";

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
    dishesApiRequest.getDishDetail(getIdFromSlugUrl(slug))
  );

  const dish = data?.payload?.data;
  return (
    <Modal>
      <DishDetail dish={dish} />
    </Modal>
  );
}
