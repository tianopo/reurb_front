import { Outlet } from "react-router-dom";
import { Flex } from "src/components/Flex/Flex";
import { FlexCol } from "src/components/Flex/FlexCol";

export const PublicLayout = () => {
  return (
    <Flex>
      <FlexCol className="w-1/2">
        <img src="/logo/logo-black.png" alt="logo Reurb" />
      </FlexCol>
      <FlexCol className="w-1/2">
        <Outlet />
      </FlexCol>
    </Flex>
  );
};
