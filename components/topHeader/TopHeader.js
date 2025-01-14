"use client";

import "./TopHeader.css";

import { useContext } from "react";

import Image from "next/image";
import ShowLocation from "../showLocation/ShowLocation";
import Nav from "@/components/nav/Nav";
import { UserAuthContext } from "@/contexts/AuthContext";

const TopHeader = () => {
  const { ChangeUrl } = useContext(UserAuthContext);

  return (
    <>
      <div className="top-header">
        <div className="left">
          <div
            className="phone"
            onClick={() => {
              window.open("tel:+974 7748 0070");
            }}
          >
            <i className="fa-solid fa-phone"></i>
            <abbr title="Phone Number">+974 7748 0070</abbr>
          </div>
          <div
            className="mail"
            onClick={() => {
              window.open("mailto:sales@goldenbrandqa.com");
            }}
          >
            <i className="fa-regular fa-envelope"></i>
            <abbr title="E-mail">sales@goldenbrandqa.com</abbr>
          </div>
          <ShowLocation />
        </div>

        <div className="right">
          <div className="socials">
            <abbr title="Facebook">
              <i
                className="fa-brands fa-facebook"
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/profile.php?id=100090249531663",
                  );
                }}
              ></i>
            </abbr>
            <abbr title="TikTok">
              <i
                className="fa-brands fa-tiktok"
                onClick={() => {
                  window.open("https://www.tiktok.com/@golden.brand52");
                }}
              ></i>
            </abbr>
            <abbr title="Instagram">
              <i
                className="fa-brands fa-instagram"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/goldenbrand_stainlesssteel/",
                  );
                }}
              ></i>
            </abbr>
            <abbr title="Whatsapp">
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
              ChangeUrl("./contact");
            }}
          >
            Contact Us
          </div>
          <div className="language" onClick={() => ChangeUrl("/ar")}>
            <abbr title="Change to Arabic">العربية</abbr>
            <Image
              src="/images/arabic-language.png"
              width={20}
              height={20}
              alt="arabic"
            />
          </div>
          {/* <div className="language" onClick={() => ChangeUrl("/en")}>
            <Image
              src="/images/english-language.png"
              width={20}
              height={20}
              alt="arabic"
            />
            <abbr title="Change to English">En</abbr>
          </div> */}
        </div>
      </div>
      <Nav />
    </>
  );
};

export default TopHeader;
