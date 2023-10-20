import { useQuery } from '@apollo/client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt_decode, { JwtPayload } from 'jwt-decode'

const privateRoutes = ['/events', '/event']

const publicRoutes = ['/login', '/register']

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('accessToken')?.value

  let isAuthenticated = false

  if (token) {
    try {
      const decodedToken: JwtPayload = jwt_decode(token)

      // Check if the token is expired
      if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        // Token is expired, redirect to login
        const absoluteURL = new URL('/login', req.nextUrl.origin)
        return NextResponse.redirect(absoluteURL.toString())
      }
      isAuthenticated = true
    } catch (error) {
      const absoluteURL = new URL('/login', req.nextUrl.origin)
      return NextResponse.redirect(absoluteURL.toString())
    }
  }

  if (!isAuthenticated && privateRoutes.includes(pathname)) {
    const absoluteURL = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  if (isAuthenticated && publicRoutes.includes(pathname)) {
    const absoluteURL = new URL('/events', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  return NextResponse.next()
}
