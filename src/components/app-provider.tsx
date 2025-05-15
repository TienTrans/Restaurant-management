"use client"
import RefreshToken from "@/components/refresh-token"
import {
    decodeJWT,
    getAccessTokenFromLocalStorage,
    removeTokenFromLocalStorage,
} from "@/lib/utils"
import { RoleType, TokenPayload } from "@/types/jwt.types"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

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
    role: undefined as RoleType | undefined,
    setRole: (role?: RoleType | undefined) => {},
})

export const useAppContext = () => {
    return useContext(AppContext)
}

export default function AppProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [role, setRoleState] = useState<RoleType | undefined>(undefined)
    useEffect(() => {
        const accessToken = getAccessTokenFromLocalStorage()
        if (accessToken) {
            const role = decodeJWT(accessToken).role
            setRoleState(role)
        }
    }, [])
    const setRole = useCallback((role?: RoleType | undefined) => {
        setRoleState(role)
        if (!role) {
            removeTokenFromLocalStorage()
        }
    }, [])
    const isAuth = Boolean(role)
    return (
        <AppContext.Provider value={{ isAuth, role, setRole }}>
            <QueryClientProvider client={queryClient}>
                <RefreshToken />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AppContext.Provider>
    )
}
