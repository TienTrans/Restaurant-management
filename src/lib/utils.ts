import { toast } from "@/components/ui/use-toast"
import { EntityError } from "@/lib/http"
import { type ClassValue, clsx } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken"
import authApiRequest from "@/apiRequests/auth"
import { DishStatus, OrderStatus, TableStatus } from "@/constants/type"
import envConfig from "@/config"
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
    error,
    setError,
    duration,
}: {
    error: any
    setError?: UseFormSetError<any>
    duration?: number
}) => {
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((items) => {
            setError(items.field, {
                type: "server",
                message: items.message,
            })
        })
    } else {
        toast({
            title: "Error",
            description: error?.payload?.message ?? "loi khong xac dinh",
            duration: duration ?? 3000,
        })
    }
}

const isBrowser = typeof window !== "undefined"

// xoa di ky tu dau tien cua path
export const normalizePath = (path: string) => {
    return path.startsWith("/") ? path.slice(1) : path
}

export const decodeJWT = <PayLoad = any>(token: string) => {
    return jwt.decode(token) as PayLoad
}

export const getAccessTokenFromLocalStorage = () => {
    return isBrowser ? localStorage.getItem("accessToken") : null
}

export const getRefeshTokenFromLocalStorage = () => {
    return isBrowser ? localStorage.getItem("refreshToken") : null
}

export const setAccessTokenFromLocalStorage = (accessToken: string) => {
    return isBrowser && localStorage.setItem("accessToken", accessToken)
}

export const setRefreshTokenFromLocalStorage = (refreshToken: string) => {
    return isBrowser && localStorage.setItem("refreshToken", refreshToken)
}

export const removeTokenFromLocalStorage = () => {
    isBrowser && localStorage.removeItem("accessToken")
    isBrowser && localStorage.removeItem("refreshToken")
}

export const checkAndRefreshToken = async (params?: {
    onError?: () => void
    onSuccess?: () => void
}) => {
    const accessToken = getAccessTokenFromLocalStorage()
    const refreshToken = getRefeshTokenFromLocalStorage()
    if (!accessToken || !refreshToken) return
    const decodedAccessToken = jwt.decode(accessToken) as {
        exp: number
        iat: number
    }
    const decodedRefreshToken = jwt.decode(refreshToken) as {
        exp: number
        iat: number
    }
    const now = new Date().getTime() / 1000 - 1
    // trường hợp refreshToken hết hạn thì không sử lý nữa
    if (decodedRefreshToken.exp < now) {
        removeTokenFromLocalStorage()
        return params?.onError && params.onError()
    }
    // vi du accessToken co thoi gian het han la 10s
    // thi se kiem tra con 1/3s thoi gian het han cua accessToken se cho refresh lai
    //  thoi gian con lai se tinh dua tren cong thuc : decodedAccessToken.exp - now
    //  thoi gian het han cua accessToken dua tren cong thuc : decodedAccessToken.exp - decodedAccessToken.iat
    if (
        decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
    ) {
        try {
            const res = await authApiRequest.refreshToken()
            setAccessTokenFromLocalStorage(res.payload.data.accessToken)
            setRefreshTokenFromLocalStorage(res.payload.data.refreshToken)
            params?.onSuccess && params.onSuccess()
        } catch (error) {
            params?.onError && params.onError()
        }
    }
}

export const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(number)
}

export const getVietnameseDishStatus = (
    status: (typeof DishStatus)[keyof typeof DishStatus]
) => {
    switch (status) {
        case DishStatus.Available:
            return "Có sẵn"
        case DishStatus.Unavailable:
            return "Không có sẵn"
        default:
            return "Ẩn"
    }
}

export const getVietnameseOrderStatus = (
    status: (typeof OrderStatus)[keyof typeof OrderStatus]
) => {
    switch (status) {
        case OrderStatus.Delivered:
            return "Đã phục vụ"
        case OrderStatus.Paid:
            return "Đã thanh toán"
        case OrderStatus.Pending:
            return "Chờ xử lý"
        case OrderStatus.Processing:
            return "Đang nấu"
        default:
            return "Từ chối"
    }
}

export const getVietnameseTableStatus = (
    status: (typeof TableStatus)[keyof typeof TableStatus]
) => {
    switch (status) {
        case TableStatus.Available:
            return "Có sẵn"
        case TableStatus.Reserved:
            return "Đã đặt"
        default:
            return "Ẩn"
    }
}

export const getTableLink = ({
    token,
    tableNumber,
}: {
    token: string
    tableNumber: number
}) => {
    return (
        envConfig.NEXT_PUBLIC_URL + "/tables/" + tableNumber + "?token=" + token
    )
}
