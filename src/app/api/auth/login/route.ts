import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { HttpError } from "@/lib/http";
export async function POST(request: Request) {
    const body = (await request.json()) as LoginBodyType;
    const cookieStore = cookies();
    try {
        const { payload } = await authApiRequest.slogin(body);
        const { accessToken, refreshToken } = payload.data;

        const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
        const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };
        cookieStore.set("accessToken", accessToken, {
            expires: decodedAccessToken.exp * 1000,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        });
        cookieStore.set("refreshToken", refreshToken, {
            expires: decodedRefreshToken.exp * 1000,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        });
        return Response.json(payload);
    } catch (error) {
        if (error instanceof HttpError) {
            return Response.json(error.payload, {
                status: error.status,
            });
        } else {
            return Response.json(
                {
                    message: "Lỗi không xác định",
                },
                {
                    status: 500,
                }
            );
        }
    }
}
