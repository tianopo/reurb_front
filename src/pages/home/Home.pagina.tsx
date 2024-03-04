import { CarProfile, Moon, Table } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { FlexCol } from "src/components/Flex/FlexCol";
import { SectionContact } from "src/components/Layout/Section/SectionContact";
import { SectionBannerSegundo } from "./SectionBannerSegundo";
import { SectionCardSegundo } from "./SectionCardSegundo";
import { SectionCarousel } from "src/components/Layout/Section/SectionCarousel";

export const Home = () => {
  const { t: translator } = useTranslation();
  const t = (t: string) => translator(`inicio.${t}`);

  const card = [
    {
      description: t("cardDescricao"),
      icon: <Moon size={60} />,
    },
    {
      description: t("cardDescricao"),
      icon: <CarProfile size={60} />,
    },
    {
      description: t("cardDescricao"),
      icon: <Table size={60} />,
    },
  ];

  return (
    <FlexCol className="gap-32">
      <SectionCarousel
        images={["/projeto/banner.webp", "/projeto/banner2.png", "/projeto/banner3.jpeg"]}
      />
      <SectionCardSegundo card={card} id="informacoes" />
      <SectionBannerSegundo
        imagem="/projeto/banner.webp"
        titulo="Fábrica de Software"
        descricao={t("bannerDescricao")}
        rota="https://wa.me/5512982435638"
        botao={t("bannerBotao")}
        id="agendamento"
      />
      <SectionContact id="contato" title={t("contatoTitulo")} />
    </FlexCol>
  );
};
