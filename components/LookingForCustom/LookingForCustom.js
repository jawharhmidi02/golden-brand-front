import { UserAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useContext } from "react";

const LookingForCustom = () => {
  const tCommon = useTranslations("common");
  const tLookingForCustom = useTranslations("lookingForCustom");
  const { ChangeUrl, Link } = useContext(UserAuthContext);

  return (
    <div className="my-[70px] flex flex-col items-center justify-center gap-5 bg-white px-[20px] py-[50px] md:flex-row">
      <div>
        <Image
          src="/images/goldenbrand_stainlesssteel_1725566437708.jpeg"
          width={100}
          height={100}
          alt="line"
          className="w-full rounded-lg shadow-lg drop-shadow-lg"
          priority
        />
      </div>
      <div className="flex flex-col">
        <div className="mt-6 text-center text-3xl font-semibold text-[var(--theme)]">
          {tLookingForCustom("title")}
        </div>
        <div className="my-1 text-center text-2xl font-medium text-neutral-700">
          {tLookingForCustom("smallDescription")}
        </div>
        <div className="mt-2 max-w-[600px] text-center text-neutral-500">
          {tLookingForCustom("description")}
        </div>
        <div className="mb-6 mt-3 flex w-full items-center justify-center">
          <Link
            className="w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme)] px-6 py-2 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme)] hover:bg-[#ffffff] hover:text-[var(--theme)] active:scale-95"
            onClick={() => {
              ChangeUrl("/contact");
            }}
            href="/contact"
          >
            {tCommon("contact.contactUs")}
          </Link>
        </div>
      </div>
      <div>
        <Image
          src="/images/goldenbrand_stainlesssteel_1725566471006.jpeg"
          width={100}
          height={100}
          className="w-full rounded-lg shadow-lg drop-shadow-lg"
          alt="line"
          priority
        />
      </div>
    </div>
  );
};

export default LookingForCustom;
