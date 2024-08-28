import http from "@/lib/http"
import {
    CreateTableBodyType,
    TableListResType,
    TableResType,
    UpdateTableBodyType,
} from "@/schemaValidations/table.schema"

const prefix = "tables"
const tableApiRequest = {
    getAll: async () => {
        return await http.get<TableListResType>(prefix)
    },
    getDetails: async (id: number) => {
        return await http.get<TableResType>(`${prefix}/${id}`)
    },
    create: async (payload: CreateTableBodyType) => {
        return await http.post<TableResType>(prefix, payload)
    },
    update: async (id: number, payload: UpdateTableBodyType) => {
        return await http.put<TableResType>(`${prefix}/${id}`, payload)
    },
    delete: async (id: number) => {
        return await http.delete<TableResType>(`${prefix}/${id}`)
    },
}

export default tableApiRequest
