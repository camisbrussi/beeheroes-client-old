import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      "600": "#4D6F80",
      "50": "#F5F8FA",
    },
    yellow: {
      "400": "#F0C118",
    },
    brown: {
      "300": "#948178",
      "600": "#41291E",
    },
  },
  fonts: {
    heading: "Nunito",
    body: "Nunito",
  },
  styles: {
    global: {
      body: {
        bg: "blue.50",
        color: "blue.600",
      },
    },
  },
});
