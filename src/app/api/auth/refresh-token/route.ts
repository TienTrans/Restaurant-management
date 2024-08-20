import authApiRequest from "@/apiRequests/auth"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
export async function POST(request: Request) {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value
    if (!refreshToken) {
        return Response.json(
            {
                message: "Khong tim thay refreshToken",
            },
            {
                status: 401,
            }
        )
    }
    try {
        const { payload } = await authApiRequest.sRefreshToken({ refreshToken })

        const decodedAccessToken = jwt.decode(payload.data.accessToken) as {
            exp: number
        }
        const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as {
            exp: number
        }
        cookieStore.set("accessToken", payload.data.accessToken, {
            expires: decodedAccessToken.exp * 1000,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        })
        cookieStore.set("refreshToken", payload.data.refreshToken, {
            expires: decodedRefreshToken.exp * 1000,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        })
        return Response.json(payload)
    } catch (error: any) {
        return Response.json(
            {
                message: error.message,
            },
            {
                status: 401,
            }
        )
    }
}
