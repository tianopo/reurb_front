import { useTranslation } from "react-i18next";
import { Flex } from "../Flex/Flex";
import { FlexCol } from "../Flex/FlexCol";
import { FlexRow } from "../Flex/FlexRow";
import { Divider } from "../Other/Divider";
import { LinkX } from "../Other/LinkX";

interface IFooter {
  title?: string;
  description?: string;
  icons?: {
    image: string;
    route: string;
  }[];
  nav?: {
    text: string;
    route: string;
  }[];
}

export const Footer = ({ title, description, icons, nav }: IFooter) => {
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
      <Flex
        className="
        w-full
        flex-col
        justify-between
        gap-3
        p-4
        text-white
        md:flex-row
        "
      >
        {(title || description) && (
          <FlexCol className="w-full gap-3">
            <p className="text-24 font-bold">{title}</p>
            <p className="text-16">{description}</p>
          </FlexCol>
        )}
        {nav && (
          <Flex className="w-full flex-col gap-2.5 px-0 md:px-8">
            {nav?.map(({ text, route }, key: number) => (
              <FlexCol
                key={key}
                className="
                w-full
                items-start
                pt-1
                text-20
                font-semibold
                hover:underline
                md:items-center
                "
              >
                <a key={key} href={route}>
                  <p
                    className={`
                    text-16
                    font-bold
                    text-white
                    hover:underline
                    `}
                  >
                    {text.toUpperCase()}
                  </p>
                </a>
                <Divider />
              </FlexCol>
            ))}
          </Flex>
        )}
        {icons && (
          <FlexCol className="w-1/2 items-start text-end md:items-end">
            <p className="whitespace-nowrap text-24 font-bold">{t("redesSociais")}</p>
            <FlexRow className="gap-3">
              {icons?.map(({ image, route }, key) => (
                <LinkX route={route} target="blank" key={key}>
                  <img src={image} alt="Social Media Icon" className="h-6 w-6" />
                </LinkX>
              ))}
            </FlexRow>
          </FlexCol>
        )}
      </Flex>
      <FlexCol className="w-full items-center px-5">
        <Divider />
        <p className="text-10 font-semibold text-white">
          © {t("direitoAutoral")} {new Date().getFullYear()}. {t("feitoPor")}{" "}
          <LinkX route="https://github.com/tianopo" target="blank">
            tianopo
          </LinkX>
        </p>
      </FlexCol>
    </footer>
  );
};
