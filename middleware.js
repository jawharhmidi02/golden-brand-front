import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";

const languages = ["en", "ar"];

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookieName = "user-lang";
  const defaultLang = "en";
  const supportedLangs = ["ar", "en"];

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  let lng = "";

  const langInPath = supportedLangs.find((lang) =>
    pathname.startsWith(`/${lang}`),
  );

  if (langInPath) {
    lng = langInPath;
  }

  if (!lng && req.cookies.has(cookieName)) {
    lng = req.cookies.get(cookieName).value;
  }

  if (!lng) {
    lng = defaultLang;
  }

  if (!langInPath) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  const response = NextResponse.next();
  if (req.cookies.get(cookieName)?.value !== lng) {
    response.cookies.set(cookieName, lng);
  }

  return response;
}
