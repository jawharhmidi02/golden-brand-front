import Image from "next/image";
import React from "react";

const LookingForCustom = () => {
  return (
    <div className="flex flex-col bg-white py-[50px] px-[20px] my-[70px] items-center md:flex-row gap-5 justify-center">
      <div>
        <Image
          src="/images/goldenbrand_stainlesssteel_1725566437708.jpeg"
          width={100}
          height={100}
          alt="line"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-3xl text-[var(--theme)] text-center mt-6 font-semibold">
          Looking For Custom Products?
        </div>
        <div className="text-2xl text-neutral-700 text-center my-1 font-medium">
          We Can Help You
        </div>
        <div className="text-neutral-500 text-center mt-2 max-w-[600px]">
          At Golden Brand, we understand that every project is unique. Whether
          you're envisioning a custom kitchen setup, a bespoke handrail, or
          specialized stainless steel and aluminum products, we’re here to bring
          your ideas to life. Contact us to discuss your specifications, and
          let’s create a solution tailored just for you. Our team of experts is
          ready to assist with designs, materials, and the craftsmanship you
          need to make your vision a reality.
        </div>
        <div className="flex items-center w-full justify-center mt-3 mb-6">
          <button
            className="rounded-sm px-6 py-2 w-fit text-xl self-center border-2 border-[#ffffff] text-[#ffffff] bg-[var(--theme)] active:scale-95 hover:border-[var(--theme)] hover:bg-[#ffffff] hover:text-[var(--theme)] transition-all duration-200"
            type="button"
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
          className="w-full rounded-lg shadow-lg"
          alt="line"
        />
      </div>
    </div>
  );
};

export default LookingForCustom;
