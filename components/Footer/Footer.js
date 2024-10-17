import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="pt-20 ">
      <div className="services p-2 flex justify-center">
        <div className="service flex-1 p-1 flex flex-row gap-2">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/fast-delivery.png"}
              height={200}
              width={200}
              alt="Fast Delivery"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-[var(--blue)]">
              Fast Delivery
            </div>
            <div className="desc text-sm fourth-color-secondary">
              Get your stainless steel products quickly with our fast and
              reliable delivery service flex-1.
            </div>
          </div>
        </div>
        <div className="service flex-1 p-1 flex flex-row gap-2">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/free-delivery.png"}
              height={200}
              width={200}
              alt="Free Delivery for Orders Over 10K QAR"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-[var(--blue)]">
              Free Delivery Over 10K QAR
            </div>
            <div className="desc text-sm fourth-color-secondary">
              Enjoy free delivery on orders over 10,000 QAR—bringing quality
              right to your doorstep.
            </div>
          </div>
        </div>
        <div className="service flex-1 p-1 flex flex-row gap-2">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/payment-options.png"}
              height={200}
              width={200}
              alt="Flexible Payment Options"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-[var(--blue)]">
              Flexible Payment Options
            </div>
            <div className="desc text-sm fourth-color-secondary">
              Pay your way—MasterCard, Visa, Apple Pay, or cash on delivery,
              we’ve got you covered.
            </div>
          </div>
        </div>
        <div className="service flex-1 p-1 flex flex-row gap-2">
          <div className="image">
            <Image
              src={"/images/icons/footer-services/high-quality.png"}
              height={200}
              width={200}
              alt="High-Quality Materials & Products"
            />
          </div>
          <div className="details flex flex-col gap-1">
            <div className="title font-bold text-[var(--blue)]">
              High-Quality Materials & Products
            </div>
            <div className="desc text-sm fourth-color-secondary">
              Crafted from premium materials, our products guarantee durability
              and top-notch performance.
            </div>
          </div>
        </div>
      </div>
      <div className="footer bg-[var(--blue)]">
        <div className="content p-4"></div>
        <div className="text-white text-center border-white border-t-[1px] pb-3 pt-3">
          © 2024 <a href="/" className="font-bold">Golden Brand</a>. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
