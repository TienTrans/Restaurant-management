import http from "@/lib/http"
import {
    CreateDishBodyType,
    DishListResType,
    DishResType,
} from "@/schemaValidations/dish.schema"

const prefix = "/dishes"
const dishesApiRequest = {
    list: () => http.get<DishListResType>(prefix),
    getDishDetail: (id: number) => http.get<DishResType>(`${prefix}/${id}`),
    add: (body: CreateDishBodyType) => http.post<DishResType>(prefix, body),
    updateDish: (id: number, body: CreateDishBodyType) =>
        http.put<DishResType>(`${prefix}/${id}`, body),
    deleteDish: (id: number) => http.delete<DishResType>(`${prefix}/${id}`),
}

export default dishesApiRequest
