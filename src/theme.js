import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        bg: "#f3f4f6",
        lineHeight: "base",
      },
    }),
  },
});

export default theme;
