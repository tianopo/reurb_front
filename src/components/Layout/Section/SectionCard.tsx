import { PlusCircle } from "@phosphor-icons/react";
import { ButtonOnClick } from "src/components/Buttons/ButtonOnClick";
import { Flex } from "src/components/Flex/Flex";
import { FlexCol } from "src/components/Flex/FlexCol";
import { Section } from "../Section";

interface ISectionCard {
  id?: string;
  title?: string;
  description?: string;
  button?: string;
  route?: string;
  card?: ICard[];
}

interface ICard {
  image?: string;
  title?: string;
  description?: string;
  button?: boolean;
  route?: string;
}

export const SectionCard = ({ id, title, description, button, card, route }: ISectionCard) => {
  const rotaClick = () => {
    window.location.href = route || "";
  };

  return (
    <Section className="p-4">
      <div className="section_card-light pb-6 text-center" id={id}>
        {title && <h1 className="mb-4 gap-5 text-36 font-bold">{title}</h1>}
        {description && (
          <p className="mb-6 overflow-hidden text-ellipsis whitespace-break-spaces text-18">
            {description}
          </p>
        )}
        {button && route && (
          <ButtonOnClick className="text-white" onClick={rotaClick}>
            {button}
          </ButtonOnClick>
        )}
      </div>
      <Flex className="flex-wrap justify-center gap-6">
        {card?.map(({ title, description, image, route, button = false }: ICard, key) => (
          <FlexCol
            key={key}
            className={`section_card-light h-fit w-72 items-center gap-1.5 rounded-10 p-3 shadow-xl`}
          >
            {image && <img src={image} alt={title} className="h-16 w-16 rounded-full bg-cover" />}
            {title && <h5 className="text-20 font-bold text-white">{title}</h5>}
            {description && <p className="text-center text-16 text-white">{description}</p>}
            {button && route && (
              <button
                className="hover:opacity-50"
                onClick={() => {
                  window.location.href = route;
                }}
              >
                <PlusCircle size={24} className="text-white" />
              </button>
            )}
          </FlexCol>
        ))}
      </Flex>
    </Section>
  );
};
