import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Topbar from "../Topbar";

const Layout = () => {
  return (
    <>
      <Topbar />
      <Box maxW="1216px" w="100%" pos="relative" top="70px" margin="0 auto">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
