"use client"
import RefreshToken from "@/components/refresh-token"
import {
    getAccessTokenFromLocalStorage,
    removeTokenFromLocalStorage,
} from "@/lib/utils"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createContext, useContext, useEffect, useState } from "react"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
        },
    },
})

const AppContext = createContext({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => {},
})

export const useAppContext = () => {
    return useContext(AppContext)
}

export default function AppProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isAuth, setIsAuthState] = useState(false)
    useEffect(() => {
        const accessToken = getAccessTokenFromLocalStorage()
        if (accessToken) {
            setIsAuthState(true)
        }
    }, [])
    const setIsAuth = (isAuth: boolean) => {
        if (isAuth) {
            setIsAuthState(true)
        } else {
            setIsAuthState(false)
            removeTokenFromLocalStorage()
        }
    }
    return (
        <AppContext.Provider value={{ isAuth, setIsAuth }}>
            <QueryClientProvider client={queryClient}>
                <RefreshToken />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AppContext.Provider>
    )
}
