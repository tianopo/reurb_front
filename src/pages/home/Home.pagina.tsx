import { CarProfile, Moon, Table } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { FlexCol } from "src/components/Flex/FlexCol";
import { SectionCarousel } from "src/components/Layout/Section/SectionCarousel";
import { SectionContact } from "src/components/Layout/Section/SectionContact";
import { SectionBannerSegundo } from "./SectionBannerSegundo";
import { SectionCardSegundo } from "./SectionCardSegundo";

export const Home = () => {
  const card = [
    {
      description: "descrição",
      icon: <Moon size={60} />,
    },
    {
      description: "descrição",
      icon: <CarProfile size={60} />,
    },
    {
      description: "descrição",
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
        descricao={"descrição"}
        rota="https://wa.me/5512982435638"
        botao={"button"}
        id="agendamento"
      />
      <SectionContact id="contato" title={"Contato"} />
    </FlexCol>
  );
};
