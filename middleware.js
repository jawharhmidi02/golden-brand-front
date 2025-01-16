import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

/*
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|/images/|_next).*)",
    "/",
    "/(ar|en)/:path*",
  ],
 }; 
*/

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/(ar|en)/:path*"],
};

export function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const cookieName = "user-lang";
  const defaultLang = "en";
  const supportedLangs = ["ar", "en"];

  if (pathname.startsWith("/admin") || pathname.startsWith("/images")) {
    return NextResponse.next();
  }

  const langInPath = supportedLangs.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (langInPath) {
    const response = NextResponse.next();

    if (req.cookies.get(cookieName)?.value !== langInPath) {
      response.cookies.set(cookieName, langInPath);
    }
    return response;
  }

  let locale = defaultLang;

  if (req.cookies.has(cookieName)) {
    const cookieLang = req.cookies.get(cookieName).value;
    if (supportedLangs.includes(cookieLang)) {
      locale = cookieLang;
    }
  }

  const newUrl = new URL(`/${locale}${pathname}${search}`, req.url);

  const response = NextResponse.redirect(newUrl);

  if (req.cookies.get(cookieName)?.value !== locale) {
    response.cookies.set(cookieName, locale);
  }

  return response;
}
