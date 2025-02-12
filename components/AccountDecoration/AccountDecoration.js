import { useContext } from "react";

import { UserAuthContext } from "@/contexts/AuthContext";
import { dir } from "i18next";
import { useTranslations } from "next-intl";

const AccountDecoration = ({ welcomeText, accountText, signText, url }) => {
  const tCommon = useTranslations("common");
  const { ChangeUrl, Link } = useContext(UserAuthContext);

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-b-3xl bg-[var(--theme2)] px-8 py-24 shadow-md drop-shadow-md min-[400px]:px-14 min-[800px]:rounded-r-3xl min-[800px]:rounded-bl-none">
      <span
        className="font-lato text-3xl font-bold text-white"
        dir={dir(tCommon("language.lng"))}
      >
        {welcomeText}
      </span>
      <span className="font-lato text-sm text-neutral-50">{accountText}</span>
      <Link
        href={url}
        onClick={() => ChangeUrl(url)}
        className="rounded-full border-2 border-emerald-50 bg-[var(--hover-theme2)] px-5 py-2.5 font-lato text-lg text-[var(--theme2)] outline-none transition-all duration-200 hover:scale-[1.05] hover:bg-[var(--theme2)] hover:text-white"
      >
        {signText}
      </Link>
    </div>
  );
};

export default AccountDecoration;
