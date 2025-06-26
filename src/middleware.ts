import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/tryout', '/my-tests', '/transactions']
const adminRoutes = ['/admin']
const authRoutes = ['/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const accessToken = request.cookies.get('accessToken')?.value
    const userRole = request.cookies.get('userRole')?.value

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

    // Redirect to login if accessing protected route without token
    if ((isProtectedRoute || isAdminRoute) && !accessToken) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.set('redirectTo', pathname, { maxAge: 60 * 5 }) // 5 minutes
        return response
    }

    // Redirect to dashboard if accessing auth route with token
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Check admin access
    if (isAdminRoute && userRole !== 'admin' && userRole !== 'super_admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
}