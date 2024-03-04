import { useCallback, useEffect, useState } from "react";
import { Section } from "../Section";

interface ISectionCarousel {
  id?: string;
  images: string[];
}

export const SectionCarousel = ({ id, images }: ISectionCarousel) => {
  const [indexImage, setIndexImage] = useState(0);

  const nextImage = useCallback(() => {
    setIndexImage((a) => (a + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setIndexImage((a) => (a - 1 + images.length) % images.length);
  }, [images.length]);

  const imageSelected = (index: number) => {
    setIndexImage(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [indexImage, nextImage]);

  const actualImage = images[indexImage];

  return (
    <Section className="relative overflow-hidden">
      <div className="relative h-96 w-full" id={id}>
        <img
          src={actualImage}
          alt={`Imagem ${indexImage + 1}`}
          className="h-96 w-full transform rounded-md object-fill"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform">
        {[...Array(images.length)].map((_, index) => (
          <span
            key={index}
            onClick={() => imageSelected(index)}
            className={`mx-1 inline-block h-4 w-4 -translate-y-5 cursor-pointer rounded-full bg-icone-claro ${
              index === indexImage ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>
      <button
        onClick={previousImage}
        className={`absolute left-12 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-icone-claro p-2 text-white`}
      >
        {"<"}
      </button>
      <button
        onClick={nextImage}
        className={`absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-icone-claro p-2 text-white`}
      >
        {">"}
      </button>
    </Section>
  );
};
