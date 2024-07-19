import { Outlet } from "react-router-dom";
import { Flex } from "src/components/Flex/Flex";
import { FlexCol } from "src/components/Flex/FlexCol";

export const PublicLayout = () => {
  return (
    <Flex className="h-screen">
      <div className="hidden w-1/2 items-center justify-center bg-gradient md:flex">
        <img src="/logo/logo-black.png" alt="logo Reurb" height="267" width="446" />
      </div>
      <FlexCol className="flex h-full w-full flex-col items-center justify-center md:w-1/2">
        <Outlet />
      </FlexCol>
    </Flex>
  );
};
