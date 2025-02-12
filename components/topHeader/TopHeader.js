"use client";

import "./TopHeader.css";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import Image from "next/image";

import { UserAuthContext } from "@/contexts/AuthContext";

import Nav from "@/components/nav/Nav";
import ShowLocation from "../showLocation/ShowLocation";

const TopHeader = () => {
  const t = useTranslations("common");
  const { ChangeUrl, Link, pathname } = useContext(UserAuthContext);

  return (
    <>
      <div className="top-header">
        <div className="left">
          <Link className="phone" href={`tel:${t("contact.phone")}`}>
            <i className="fa-solid fa-phone" />
            <abbr title={t("contact.phoneTitle")} dir="ltr">
              {t("contact.phone")}
            </abbr>
          </Link>
          <Link className="mail" href={`mailto:${t("contact.email")}`}>
            <i className="fa-regular fa-envelope" />
            <abbr title={t("contact.emailTitle")} dir="ltr">
              {t("contact.email")}
            </abbr>
          </Link>
          <ShowLocation />
        </div>
        <div className="right">
          <div className="socials">
            <abbr title={t("social.facebook")}>
              <Link
                href={"https://www.facebook.com/profile.php?id=100090249531663"}
              >
                <i className="fa-brands fa-facebook" />
              </Link>
            </abbr>
            <abbr title={t("social.tiktok")}>
              <Link href={"https://www.tiktok.com/@golden.brand52"}>
                <i className="fa-brands fa-tiktok" />
              </Link>
            </abbr>
            <abbr title={t("social.instagram")}>
              <Link
                href={"https://www.instagram.com/goldenbrand_stainlesssteel/"}
              >
                <i className="fa-brands fa-instagram" />
              </Link>
            </abbr>
            <abbr title={t("social.whatsapp")}>
              <Link href={"https://wa.me/97477480070"}>
                <i className="fa-brands fa-whatsapp" />
              </Link>
            </abbr>
          </div>
          <Link
            className="contact-us"
            onClick={() => ChangeUrl("/contact")}
            href="/contact"
          >
            {t("contact.contactUs")}
          </Link>
          <Link
            className="language flex flex-row gap-1"
            onClick={() =>
              ChangeUrl(pathname, { locale: t("language.otherLng") })
            }
            href={pathname}
            locale={t("language.otherLng")}
          >
            <abbr title={t("language.switchToLanguage")}>
              {t("language.otherLanguage")}
            </abbr>
            <Image
              src={t("language.imageSrc")}
              width={20}
              height={20}
              alt={t("language.otherLanguage")}
            />
          </Link>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default TopHeader;
