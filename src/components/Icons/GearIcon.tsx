import { Gear } from "@phosphor-icons/react";

export const GearIcon = () => {
  return (
    <div
      className="relative h-fit before:absolute before:-bottom-24 before:left-1/2 before:w-max before:-translate-x-1/2 before:-translate-y-full before:rounded-md before:bg-terciary before:p-2.5 before:text-white before:opacity-0 before:transition-all before:content-[attr(data-tip)] after:absolute after:-bottom-2 after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-terciary after:border-l-transparent after:border-r-transparent after:border-t-transparent after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100"
      data-tip="Acessos"
    >
      <Gear className="text-write-secundary" width={19.45} height={20} />
      fvfd vffdfvd
    </div>
  );
};
