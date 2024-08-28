import dishesApiRequest from "@/apiRequests/dishes"
import tableApiRequest from "@/apiRequests/table"
import { CreateDishBodyType } from "@/schemaValidations/dish.schema"
import {
    CreateTableBodyType,
    UpdateTableBodyType,
} from "@/schemaValidations/table.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useListTables = () => {
    return useQuery({
        queryKey: ["tables"],
        queryFn: tableApiRequest.getAll,
    })
}
export const useDetailTable = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: ["table", id],
        queryFn: () => tableApiRequest.getDetails(id),
        enabled: Boolean(id),
    })
}

export const useAddTableMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["addTable"],
        mutationFn: tableApiRequest.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tables"],
                exact: true,
            })
        },
    })
}

export const useUpdateTableMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["updateTable"],
        mutationFn: ({ id, ...body }: UpdateTableBodyType & { id: number }) =>
            tableApiRequest.update(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tables"],
            })
        },
    })
}

export const useDeleteTableMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["deleteTable"],
        mutationFn: tableApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tables"],
            })
        },
    })
}
