import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

const privatePath = ["/manage"]
const unAuthPath = ["/login"]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value

    if (
        privatePath.some((path) => pathname.startsWith(path)) &&
        !refreshToken
    ) {
        const url = new URL("/login", request.url)
        url.searchParams.set("clearToken", "true")
        return NextResponse.redirect(url)
    }
    if (unAuthPath.some((path) => pathname.startsWith(path)) && refreshToken) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (
        privatePath.some((path) => pathname.startsWith(path)) &&
        !accessToken &&
        refreshToken
    ) {
        const url = new URL("/refresh-token", request.url)
        url.searchParams.set("refreshToken", refreshToken)
        url.searchParams.set("redirect", pathname)
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/manage/:path*", "/login"],
}
