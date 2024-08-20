"use client"

import {
    checkAndRefreshToken,
    getAccessTokenFromLocalStorage,
    getRefeshTokenFromLocalStorage,
} from "@/lib/utils"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function RefreshTokenPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const refreshTokenFromUrl = searchParams.get("refreshToken")
    const redirectPathname = searchParams.get("redirect")
    useEffect(() => {
        if (
            refreshTokenFromUrl &&
            refreshTokenFromUrl === getRefeshTokenFromLocalStorage()
        ) {
            checkAndRefreshToken({
                onSuccess: () => {
                    router.push(redirectPathname || "/")
                },
                onError: () => {},
            })
        } else {
            router.push("/")
        }
    }, [router, refreshTokenFromUrl, redirectPathname])
    return <div>refresh token ...</div>
}
