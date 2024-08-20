"use client"

import {
    getAccessTokenFromLocalStorage,
    getRefeshTokenFromLocalStorage,
} from "@/lib/utils"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function LogoutPage() {
    const { mutateAsync } = useLogoutMutation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const accessTokenFromUrl = searchParams.get("accessToken")
    const refreshTokenFromUrl = searchParams.get("refreshToken")
    const ref = useRef<any>(null)
    useEffect(() => {
        if (
            !ref.current &&
            ((accessTokenFromUrl &&
                accessTokenFromUrl === getAccessTokenFromLocalStorage()) ||
                (refreshTokenFromUrl &&
                    refreshTokenFromUrl === getRefeshTokenFromLocalStorage()))
        ) {
            ref.current = mutateAsync
            mutateAsync().then(() => {
                setTimeout(() => {
                    ref.current = null
                }, 1000)
                router.push("/login")
            })
        } else {
            router.push("/")
        }
    }, [mutateAsync, router, accessTokenFromUrl, refreshTokenFromUrl])
    return <div>logout page</div>
}
