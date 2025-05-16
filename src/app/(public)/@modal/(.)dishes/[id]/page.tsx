import dishesApiRequest from "@/apiRequests/dishes";
import Modal from "@/app/(public)/@modal/(.)dishes/[id]/modal";
import DishDetail from "@/app/(public)/dishes/[id]/dish-detail";
import { wrapServerApi } from "@/lib/utils";

export default async function DishPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const data = await wrapServerApi(() =>
    dishesApiRequest.getDishDetail(Number(id))
  );

  const dish = data?.payload?.data;
  return (
    <Modal>
      <DishDetail dish={dish} />
    </Modal>
  );
}
