import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig)

const allowedRoutes = ['/politika_konfidentisalnosti', '/soglasie_na_obrabotky_konfidencialnih_dannih', '/courses', '/teachers', '/contacts'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; 
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAllowedRoute = allowedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute){
    return
  }

  if (isAllowedRoute) {
    return; // Доступ разрешен, ничего не делаем
  }

  if(isAuthRoute){
    if (isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if(!isLoggedIn && !isPublicRoute){
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search){
      callbackUrl +=nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    
    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`, 
      nextUrl
    ))
  }

  return
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};