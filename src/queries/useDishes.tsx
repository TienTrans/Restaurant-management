import dishesApiRequest from "@/apiRequests/dishes"
import {
    CreateDishBodyType,
    UpdateDishBody,
    UpdateDishBodyType,
} from "@/schemaValidations/dish.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useListDishes = () => {
    return useQuery({
        queryKey: ["dishes"],
        queryFn: dishesApiRequest.list,
    })
}
export const useDetailDish = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: ["dishes", id],
        queryFn: () => dishesApiRequest.getDishDetail(id),
        enabled: Boolean(id),
    })
}

export const useAddDishMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["addDishes"],
        mutationFn: dishesApiRequest.add,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["dishes"],
            })
        },
    })
}

export const useUpdateDishMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["updateDishes"],
        mutationFn: ({ id, ...body }: UpdateDishBodyType & { id: number }) =>
            dishesApiRequest.updateDish(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["dishes"],
            })
        },
    })
}

export const useDeleteDishMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["deleteDishes"],
        mutationFn: dishesApiRequest.deleteDish,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["dishes"],
            })
        },
    })
}
