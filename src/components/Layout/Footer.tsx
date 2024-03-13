import { useTranslation } from "react-i18next";
import { LinkX } from "../Other/LinkX";

export const Footer = () => {
  const { t: translator } = useTranslation();
  const t = (t: string) => translator(`footer.${t}`);

  return (
    <footer
      className={`
      footer-light
      flex
      h-fit
      w-full
      flex-col
      items-center
      gap-4
      border-t-1
      shadow-xl
    `}
    >
      <p className="text-10 font-semibold text-white">
        © {t("direitoAutoral")} {new Date().getFullYear()}. {t("feitoPor")}{" "}
        <LinkX route="https://github.com/tianopo" target="blank">
          tianopo
        </LinkX>
      </p>
    </footer>
  );
};
