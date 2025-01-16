import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale;

  try {
    locale = await requestLocale;

    if (!locale || !locales.includes(locale)) {
      locale = defaultLocale;
    }
  } catch (error) {
    console.error("Error getting locale:", error);
    locale = defaultLocale;
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      locale,
      messages,
      timeZone: "UTC",
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);

    if (locale !== defaultLocale) {
      const messages = (await import(`../../messages/${defaultLocale}.json`))
        .default;
      return {
        locale: defaultLocale,
        messages,
        timeZone: "UTC",
      };
    }
    throw error;
  }
});
