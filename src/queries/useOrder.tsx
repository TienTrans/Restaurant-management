import orderApiRequest from "@/apiRequests/order"
import {
    GetOrdersQueryParamsType,
    UpdateOrderBodyType,
} from "@/schemaValidations/order.schema"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUpdateOrderMutation = () => {
    return useMutation({
        mutationFn: (payload: UpdateOrderBodyType & { orderId: number }) =>
            orderApiRequest.updateOrder(payload.orderId, payload),
    })
}

export const useGetOrderListQuery = (queryParams: GetOrdersQueryParamsType) => {
    return useQuery({
        queryFn: () => orderApiRequest.getOrderList(queryParams),
        queryKey: ["orders", queryParams],
    })
}

export const useGetOrderDetailQuery = ({
    id,
    enabled,
}: {
    id: number
    enabled: boolean
}) => {
    return useQuery({
        queryFn: () => orderApiRequest.getOrderDetail(id),
        queryKey: ["order", id],
        enabled,
    })
}
