import { FlexCol } from "src/components/Flex/FlexCol";
import { SectionContact } from "src/components/Layout/Section/SectionContact";

export const Home = () => {
  return (
    <FlexCol className="gap-32">
      <SectionContact id="contato" title={"Contato"} />
    </FlexCol>
  );
};
