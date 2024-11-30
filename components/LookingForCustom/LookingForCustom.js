import Image from "next/image";
import React from "react";

const LookingForCustom = ({ ChangeUrl }) => {
  return (
    <div className="my-[70px] flex flex-col items-center justify-center gap-5 bg-white px-[20px] py-[50px] md:flex-row">
      <div>
        <Image
          src="/images/goldenbrand_stainlesssteel_1725566437708.jpeg"
          width={100}
          height={100}
          alt="line"
          className="w-full rounded-lg shadow-lg drop-shadow-lg"
        />
      </div>
      <div className="flex flex-col">
        <div className="mt-6 text-center text-3xl font-semibold text-[var(--theme)]">
          Looking For Custom Products?
        </div>
        <div className="my-1 text-center text-2xl font-medium text-neutral-700">
          We Can Help You
        </div>
        <div className="mt-2 max-w-[600px] text-center text-neutral-500">
          At Golden Brand, we understand that every project is unique. Whether
          you're envisioning a custom kitchen setup, a bespoke handrail, or
          specialized stainless steel and aluminum products, we’re here to bring
          your ideas to life. Contact us to discuss your specifications, and
          let’s create a solution tailored just for you. Our team of experts is
          ready to assist with designs, materials, and the craftsmanship you
          need to make your vision a reality.
        </div>
        <div className="mb-6 mt-3 flex w-full items-center justify-center">
          <button
            className="w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme)] px-6 py-2 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme)] hover:bg-[#ffffff] hover:text-[var(--theme)] active:scale-95"
            type="button"
            onClick={() => {
              ChangeUrl("/contact");
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
      <div>
        <Image
          src="/images/goldenbrand_stainlesssteel_1725566471006.jpeg"
          width={100}
          height={100}
          className="w-full rounded-lg shadow-lg drop-shadow-lg"
          alt="line"
        />
      </div>
    </div>
  );
};

export default LookingForCustom;
