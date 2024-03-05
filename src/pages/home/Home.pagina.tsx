import { FlexCol } from "src/components/Flex/FlexCol";
import { SectionCarousel } from "src/components/Layout/Section/SectionCarousel";
import { SectionContact } from "src/components/Layout/Section/SectionContact";

export const Home = () => {
  console.log("oi")
  return (
    <FlexCol className="gap-32">
      <SectionCarousel
        images={["/projeto/banner.webp", "/projeto/banner2.png", "/projeto/banner3.jpeg"]}
      />
      <SectionContact id="contato" title={"Contato"} />
    </FlexCol>
  );
};
