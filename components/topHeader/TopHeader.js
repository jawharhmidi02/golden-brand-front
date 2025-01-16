"use client";

import "./TopHeader.css";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import Image from "next/image";

import { UserAuthContext } from "@/contexts/AuthContext";

import Nav from "@/components/nav/Nav";
import ShowLocation from "../showLocation/ShowLocation";

const TopHeader = () => {
  const t = useTranslations("header");
  const { ChangeUrl } = useContext(UserAuthContext);

  return (
    <>
      <div className="top-header">
        <div className="left">
          <div
            className="phone"
            onClick={() => {
              window.open(`tel:${t("contact.phone")}`);
            }}
          >
            <i className="fa-solid fa-phone"></i>
            <abbr title={t("contact.phoneTitle")}>{t("contact.phone")}</abbr>
          </div>
          <div
            className="mail"
            onClick={() => {
              window.open(`mailto:${t("contact.email")}`);
            }}
          >
            <i className="fa-regular fa-envelope"></i>
            <abbr title={t("contact.emailTitle")}>{t("contact.email")}</abbr>
          </div>
          <ShowLocation />
        </div>
        <div className="right">
          <div className="socials">
            <abbr title={t("social.facebook")}>
              <i
                className="fa-brands fa-facebook"
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/profile.php?id=100090249531663",
                  );
                }}
              ></i>
            </abbr>
            <abbr title={t("social.tiktok")}>
              <i
                className="fa-brands fa-tiktok"
                onClick={() => {
                  window.open("https://www.tiktok.com/@golden.brand52");
                }}
              ></i>
            </abbr>
            <abbr title={t("social.instagram")}>
              <i
                className="fa-brands fa-instagram"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/goldenbrand_stainlesssteel/",
                  );
                }}
              ></i>
            </abbr>
            <abbr title={t("social.whatsapp")}>
              <i
                className="fa-brands fa-whatsapp"
                onClick={() => {
                  window.open("https://wa.me/97477480070");
                }}
              ></i>
            </abbr>
          </div>
          <div
            className="contact-us"
            onClick={() => {
              ChangeUrl("/contact");
            }}
          >
            {t("contact.contactUs")}
          </div>
          <div
            className="language"
            onClick={() => ChangeUrl(t("language.otherLng"))}
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
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default TopHeader;
