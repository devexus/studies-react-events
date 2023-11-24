import { Flex, Box, Link, Image } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const NAVIGATION_OPTIONS = [
  {
    id: 1,
    path: "/",
    name: "Home",
  },
  {
    id: 2,
    path: "/events",
    name: "Events",
  },
  {
    id: 3,
    path: "/categories",
    name: "Categories",
  },
];

const Topbar = () => {
  const location = useLocation();

  return (
    <Box
      bg={"white"}
      boxShadow="md"
      h="70px"
      position={"fixed"}
      top="0"
      left="0"
      right="0"
      zIndex={11}
    >
      <Box maxW="1216px" w="100%" height="100%" m="0 auto">
        <Flex alignItems="center" height="100%">
          <Image src={logo} alt="Logo" height={70} />
          <Flex ml={5} gap={4} height="100%">
            {NAVIGATION_OPTIONS.map((el) => (
              <Link
                display={"inline-flex"}
                key={el.id}
                as={NavLink}
                to={el.path}
                _hover={{
                  textDecoration: "none",
                  borderBottom: "2px solid #afafaf",
                }}
                alignItems="center"
                height={"100%"}
                borderBottom={
                  location.pathname === el.path
                    ? "2px solid #2a8eff"
                    : "2px solid #fff"
                }
              >
                {el.name}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Topbar;
