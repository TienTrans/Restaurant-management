"use client"

import { useAppContext } from "@/components/app-provider"
import {
    getAccessTokenFromLocalStorage,
    getRefeshTokenFromLocalStorage,
} from "@/lib/utils"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef } from "react"

function Logout() {
    const { mutateAsync } = useLogoutMutation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setIsAuth } = useAppContext()
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
                setIsAuth(false)
                router.push("/login")
            })
        } else {
            router.push("/")
        }
    }, [
        mutateAsync,
        router,
        accessTokenFromUrl,
        refreshTokenFromUrl,
        setIsAuth,
    ])
    return <div>logout page</div>
}

export default function LogoutPage() {
    return (
        <Suspense>
            <Logout />
        </Suspense>
    )
}
