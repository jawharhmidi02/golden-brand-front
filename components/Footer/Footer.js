import "./Footer.css";

import { useContext } from "react";
import Image from "next/image";

import { UserAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";

const Footer = () => {
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const { ChangeUrl } = useContext(UserAuthContext);

  return (
    <div className="mt-[100px]">
      <div className="services flex flex-wrap justify-center gap-4 p-2">
        <div className="service flex min-w-full flex-1 flex-row gap-2 p-1 sm:min-w-[320px] lg:min-w-0">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/fast-delivery.png"}
              height={200}
              width={200}
              alt="Fast Delivery"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-neutral-800">
              {tFooter("services.fastDelivery.title")}
            </div>
            <div className="desc text-sm text-neutral-500">
              {tFooter("services.fastDelivery.description")}
            </div>
          </div>
        </div>
        <div className="service flex min-w-full flex-1 flex-row gap-2 p-1 sm:min-w-[320px] lg:min-w-0">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/free-delivery.png"}
              height={200}
              width={200}
              alt="Free Delivery for Orders Over 10K QAR"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-neutral-800">
              {tFooter("services.freeDeliveryOver10KQAR.title")}
            </div>
            <div className="desc text-sm text-neutral-500">
              {tFooter("services.freeDeliveryOver10KQAR.description")}
            </div>
          </div>
        </div>
        <div className="service flex min-w-full flex-1 flex-row gap-2 p-1 sm:min-w-[320px] lg:min-w-0">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/payment-options.png"}
              height={200}
              width={200}
              alt="Flexible Payment Options"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-neutral-800">
              {tFooter("services.flexiblePaymentOptions.title")}
            </div>
            <div className="desc text-sm text-neutral-500">
              {tFooter("services.flexiblePaymentOptions.description")}
            </div>
          </div>
        </div>
        <div className="service flex min-w-full flex-1 flex-row gap-2 p-1 sm:min-w-[320px] lg:min-w-0">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/high-quality.png"}
              height={200}
              width={200}
              alt="High-Quality Materials & Products"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-neutral-800">
              {tFooter("services.high-QualityMaterialsAndProducts.title")}
            </div>
            <div className="desc text-sm text-neutral-500">
              {tFooter("services.high-QualityMaterialsAndProducts.description")}
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-3 bg-[#061f19]">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 pt-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <div>
                <Image
                  src="/images/dark-icon.png"
                  width={200}
                  height={200}
                  alt="icon"
                  loading="lazy"
                  onClick={() => {
                    ChangeUrl("./");
                  }}
                  className="hover:cursor-pointer"
                />
              </div>
              <p className="mt-4 max-w-xs text-center text-gray-400">
                {tFooter("description")}
              </p>
              <ul className="mt-8 flex items-center gap-6">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100090249531663"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:text-white"
                  >
                    <span className="sr-only">
                      {tCommon("social.facebook")}
                    </span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@golden.brand52"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:text-white"
                  >
                    <span className="sr-only">{tCommon("social.tiktok")}</span>
                    <i className="fa-brands fa-tiktok text-xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/goldenbrand_stainlesssteel/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:text-white"
                  >
                    <span className="sr-only">
                      {tCommon("social.instagram")}
                    </span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/97477480070"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:text-white"
                  >
                    <span className="sr-only">
                      {tCommon("social.whatsapp")}
                    </span>
                    <svg
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 510 512.459"
                      className="size-6"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.891 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4 lg:gap-0">
              <div>
                <p className="text-lg font-bold text-white">
                  {tCommon("navigation.menu")}
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tCommon("navigation.home")}
                    </a>
                  </li>
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/services");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tCommon("navigation.services")}
                    </a>
                  </li>
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/products");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tCommon("navigation.products")}
                    </a>
                  </li>
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/contact");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tCommon("navigation.contact")}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {tFooter("company.title")}
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/about");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tCommon("navigation.about")}
                    </a>
                  </li>

                  <li className="link">
                    <a
                      href="https://maps.app.goo.gl/rtN1scuA2BeAhhze7"
                      target="_blank"
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tFooter("company.googleMaps")}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {tFooter("importantLinks.title")}
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/terms-and-conditions");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tFooter("importantLinks.termsAndConditions")}
                    </a>
                  </li>
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/about#faqs");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tFooter("importantLinks.faqs")}
                    </a>
                  </li>
                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/terms-and-conditions#payment");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tFooter("importantLinks.paymentsInfo")}
                    </a>
                  </li>

                  <li className="link">
                    <a
                      onClick={() => {
                        ChangeUrl("/contact");
                      }}
                      className="text-gray-300 transition hover:cursor-pointer hover:text-white"
                    >
                      {tCommon("navigation.contact")}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {tCommon("contact.contactUs")}
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="mailto:sales@goldenbrandqa.com"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="flex-1 break-all text-gray-300">
                        sales@goldenbrandqa.com
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="tel:+974 7748 0070"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="flex-1 text-gray-300" dir="ltr">
                        +974 7748 0070
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <address className="-mt-0.5 flex-1 not-italic text-gray-300">
                      {tCommon("contact.address")}
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "10px", marginBottom: "20px" }}
            className="mt-0 flex w-full flex-row flex-wrap items-center justify-center gap-x-10 text-white"
          >
            <Image
              src={"/images/icons/payments/mastercard.png"}
              width={80}
              height={80}
              alt="Master Card"
            />
            <Image
              src={"/images/icons/payments/visa.png"}
              width={80}
              height={80}
              alt=" Visa"
            />
            <Image
              src={"/images/icons/payments/googlepay.png"}
              width={80}
              height={80}
              alt="Google Pay"
            />
            <Image
              src={"/images/icons/payments/applepay.png"}
              width={80}
              height={80}
              alt="Apple Pay"
            />
          </div>
          <div
            style={{ marginTop: "10px", marginBottom: "5px" }}
            className="links flex w-full items-center justify-center gap-10 font-medium text-neutral-300"
          >
            <div className="link">
              <a
                className="duration-500 hover:scale-105 hover:cursor-pointer hover:text-white"
                onClick={() => {
                  ChangeUrl("/terms-and-conditions#refund");
                }}
              >
                {tFooter("importantTerms.refundAndReturns")}
              </a>
            </div>
            <div className="link">
              <a
                className="duration-500 hover:scale-105 hover:cursor-pointer hover:text-white"
                onClick={() => {
                  ChangeUrl("/terms-and-conditions#privacy");
                }}
              >
                {tFooter("importantTerms.privacyPolicy")}
              </a>
            </div>
            <div className="link">
              <a
                className="duration-500 hover:scale-105 hover:cursor-pointer hover:text-white"
                onClick={() => {
                  ChangeUrl("/terms-and-conditions#delivery");
                }}
              >
                {tFooter("importantTerms.shippingAndDelivery")}
              </a>
            </div>
          </div>
        </div>
        <div className="border-mask h-[1px] w-full bg-white"></div>
        <div className="pb-3 pt-3 text-center text-white">
          {tFooter("copyright.copyright")} © {new Date().getFullYear()}{" "}
          <a
            onClick={() => {
              ChangeUrl("/");
            }}
            className="font-bold hover:cursor-pointer"
          >
            {tCommon("goldenBrand.GoldenBrand")}
          </a>
          . {tFooter("copyright.allRightsReserved")}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
