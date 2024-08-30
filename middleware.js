import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // Exclude paths for API routes, static files, images, and other necessary files
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const defaultLang = "en";
  const supportedLangs = ["ar", "en"];

  // Handle paths starting with `_next/` directly (skip middleware)
  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // Detect language from the path
  let lng = supportedLangs.find((lang) => pathname.startsWith(`/${lang}`));

  // Fallback to language in cookie
  if (!lng && req.cookies.has(cookieName)) {
    lng = req.cookies.get(cookieName).value;
  }

  // Fallback to default language
  if (!lng) {
    lng = defaultLang;
  }

  // If no language in path, redirect to the path with language
  if (!supportedLangs.includes(lng)) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  // Create a response and set the language cookie if necessary
  const response = NextResponse.next();
  if (req.cookies.get(cookieName)?.value !== lng) {
    response.cookies.set(cookieName, lng);
  }

  return response;
}
