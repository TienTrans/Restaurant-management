"use client"

import {
    checkAndRefreshToken,
    getAccessTokenFromLocalStorage,
    getRefeshTokenFromLocalStorage,
} from "@/lib/utils"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef } from "react"

function RefreshToken() {
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

export default function RefreshTokenPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <RefreshToken />
        </Suspense>
    )
}
