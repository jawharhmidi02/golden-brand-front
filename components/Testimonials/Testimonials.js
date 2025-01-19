"use client";

import "./Testimonials.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Testimonials = () => {
  const tCommon = useTranslations("common");
  const locale = tCommon("language.lng");
  const isRTL = locale === "ar";
  const testimonials = {
    en: [
      {
        message:
          "Golden Brand transformed our commercial kitchen with their premium stainless steel equipment. The quality and durability are exceptional, and their attention to detail is remarkable. Their team's professionalism made the entire process smooth and efficient.",
        img: "/images/profile.png",
        name: "Mohammed Abdu",
        job: "Restaurant Owner",
        rate: "5.0",
      },
      {
        message:
          "We contracted Golden Brand for our hotel's handrails and kitchen equipment. Their craftsmanship is outstanding, and the installation was perfect. The stainless steel products have maintained their shine and durability even with heavy daily use.",
        img: "/images/profile.png",
        name: "Sarah Ahmad",
        job: "Hotel Operations Manager",
        rate: "5.0",
      },
      {
        message:
          "The custom aluminum solutions provided by Golden Brand exceeded our expectations. Their team understood our specific requirements and delivered exactly what we needed. The quality of materials and workmanship is truly exceptional.",
        img: "/images/profile.png",
        name: "Khaled Manssour",
        job: "Project Manager",
        rate: "5.0",
      },
      {
        message:
          "Golden Brand supplied stainless steel fixtures for our new manufacturing facility, and the results were impressive. The materials are incredibly durable, and their team ensured everything was installed on schedule.",
        img: "/images/profile.png",
        name: "Omar Al-Hassan",
        job: "Factory Owner",
        rate: "5.0",
      },
      {
        message:
          "Our retail store needed sleek and modern display units, and Golden Brand delivered exactly what we envisioned. Their aluminum designs are not only functional but also incredibly stylish. Highly recommend their services!",
        img: "/images/profile.png",
        name: "Aisha Mohammed",
        job: "Retail Manager",
        rate: "5.0",
      },
      {
        message:
          "We partnered with Golden Brand for a large-scale construction project, and their stainless steel railings were a perfect fit. The quality and precision were unparalleled, and our client was thrilled with the results.",
        img: "/images/profile.png",
        name: "Faisal Karim",
        job: "Construction Supervisor",
        rate: "5.0",
      },
    ],
    ar: [
      {
        message:
          "قامت جولدن براند بتحويل مطبخنا التجاري بمعدات الستانلس ستيل عالية الجودة. الجودة والمتانة استثنائية، واهتمامهم بالتفاصيل ملحوظ. احترافية فريقهم جعلت العملية بأكملها سلسة وفعالة.",
        img: "/images/profile.png",
        name: "محمد العبدالله",
        job: "صاحب مطعم",
        rate: "5.0",
      },
      {
        message:
          "تعاقدنا مع جولدن براند لتركيب درابزين الفندق ومعدات المطبخ. حرفيتهم متميزة، والتركيب كان مثالياً. حافظت منتجات الستانلس ستيل على لمعانها ومتانتها حتى مع الاستخدام اليومي المكثف.",
        img: "/images/profile.png",
        name: "سارة الأحمد",
        job: "مدير عمليات فندق",
        rate: "5.0",
      },
      {
        message:
          "تجاوزت حلول الألمنيوم المخصصة من جولدن براند توقعاتنا. فهم فريقهم متطلباتنا المحددة وقدموا بالضبط ما نحتاجه. جودة المواد والمصنعية رائعة حقاً.",
        img: "/images/profile.png",
        name: "خالد المنصور",
        job: "مدير مشاريع",
        rate: "5.0",
      },
      {
        message:
          "وفرت جولدن براند تجهيزات من الفولاذ المقاوم للصدأ لمنشأتنا الصناعية الجديدة، وكانت النتائج مذهلة. المواد متينة للغاية، وفريقهم ضمن أن يتم كل شيء وفق الجدول الزمني.",
        img: "/images/profile.png",
        name: "عمر الحسن",
        job: "مالك مصنع",
        rate: "5.0",
      },
      {
        message:
          "احتاج متجرنا لتجهيزات عرض أنيقة وعصرية، وقدمت جولدن براند بالضبط ما كنا نطمح إليه. تصاميم الألمنيوم ليست فقط عملية بل أنيقة للغاية. أنصح بخدماتهم بشدة!",
        img: "/images/profile.png",
        name: "عائشة محمد",
        job: "مدير متجر",
        rate: "5.0",
      },
      {
        message:
          "تعاوننا مع جولدن براند لمشروع بناء كبير، وكانت درابزينات الفولاذ المقاوم للصدأ الخاصة بهم مثالية. الجودة والدقة لا تضاهى، وكان العميل مسروراً بالنتائج.",
        img: "/images/profile.png",
        name: "فيصل كريم",
        job: "مشرف بناء",
        rate: "5.0",
      },
    ],
  };

  return (
    <section className="py-12" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[95dvw]">
        <div className="mb-16">
          <span className="mb-2 block text-center text-sm font-medium text-gray-500">
            {isRTL ? "آراء العملاء" : "TESTIMONIALS"}
          </span>
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
            <h2 className="text-center text-4xl font-bold text-gray-900">
              {isRTL
                ? "ماذا يقول عملاؤنا السعداء!"
                : "What Our Happy Clients Say!"}
            </h2>
            <div className="h-[2px] w-8 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          </div>
        </div>

        <div className="relative -mt-2">
          <div className="swiper-pagination"></div>
        </div>

        <Swiper
          // dir={isRTL ? "rtl" : "ltr"}
          modules={[Pagination, Navigation, Autoplay]}
          // speed={600}
          // loop={true}
          // autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
          }}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials[locale].map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="slide_active:border-amber-600 group mx-auto flex flex-col justify-between rounded-xl border border-solid border-gray-300 bg-white p-6 transition-all duration-500 hover:border-amber-600 hover:shadow-sm">
                <div>
                  <div className="mb-7 flex items-center gap-2 text-amber-500 transition-all duration-500">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-base font-semibold text-amber-600">
                      {testimonial.rate}
                    </span>
                  </div>
                  <p className="slide_active:text-gray-800 pb-8 text-base leading-6 text-gray-600 transition-all duration-500 group-hover:text-gray-800">
                    {testimonial.message}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-5 border-t border-solid border-gray-200 pt-5">
                  <div className="relative h-10 w-10">
                    <Image
                      className="rounded-full object-cover"
                      src={testimonial.img}
                      alt={`${testimonial.name}'s avatar`}
                      fill
                      sizes="(max-width: 40px) 100vw"
                    />
                  </div>
                  <div className="block">
                    <h5 className="mb-1 font-medium text-gray-900 transition-all duration-500">
                      {testimonial.name}
                    </h5>
                    <span className="text-sm leading-4 text-gray-500">
                      {testimonial.job}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
