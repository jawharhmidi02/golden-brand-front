import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|/images/|_next/).*)",
  ],
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
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );

  if (langInPath) {
    const response = NextResponse.next();

    if (req.cookies.get(cookieName)?.value !== langInPath) {
      response.cookies.set(cookieName, langInPath);
    }
    return response;
  }

  let lng = defaultLang;

  if (req.cookies.has(cookieName)) {
    const cookieLang = req.cookies.get(cookieName).value;
    if (supportedLangs.includes(cookieLang)) {
      lng = cookieLang;
    }
  }

  const newUrl = new URL(`/${lng}${pathname}${search}`, req.url);

  const response = NextResponse.redirect(newUrl);

  if (req.cookies.get(cookieName)?.value !== lng) {
    response.cookies.set(cookieName, lng);
  }

  return response;
}
