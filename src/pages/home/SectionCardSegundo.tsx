import { Flex } from "src/components/Flex/Flex";
import { FlexCol } from "src/components/Flex/FlexCol";
import { Section } from "src/components/Layout/Section";

interface ISectionCardSegundo {
  id?: string;
  card?: ICard[];
}

interface ICard {
  icon?: JSX.Element;
  description?: string;
}

export const SectionCardSegundo = ({ id, card }: ISectionCardSegundo) => {
  return (
    <Section className="p-4">
      <Flex className="flex-wrap justify-center gap-6">
        {card?.map(({ description, icon }: ICard, key) => (
          <FlexCol
            key={key}
            className={`section_card-claro h-fit w-72 items-center gap-1.5 rounded-10 border-3 p-3 shadow-xl`}
          >
            <div className={`section_icone-claro rounded-full border-1 p-4 text-white`} id={id}>
              {icon}
            </div>
            {description && <p className="text-center text-16 text-white">{description}</p>}
          </FlexCol>
        ))}
      </Flex>
    </Section>
  );
};
