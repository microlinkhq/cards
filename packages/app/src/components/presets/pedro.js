/* eslint-disable no-use-before-define */

import Inline from "../inline.macro";
import { ThemeProvider, Box, Flex, Text, Link } from "./scope";

const code = (
  <Inline>
    <ThemeProvider theme={query.theme}>
      <Link
        href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=block"
        rel="stylesheet"
      />

      <Flex
        sx={{
          color: "foreground",
          fontFamily: "Inter",
          fontSize: 2,
          flexDirection: "column",
          height: "100%",
          padding: "80px 80px",
        }}
      >
        <Flex sx={{ gap: 20, alignItems: "center" }}>
          <Box
            as="img"
            src="https://ped.ro/avatar.png"
            sx={{
              borderRadius: "9999px",
              display: "block",
              width: 40,
              height: 40,
            }}
          />
          <Text sx={{ fontWeight: 500 }}>Pedro Duarte</Text>
        </Flex>

        <Text sx={{ mt: 40, ml: 60 }}>{query.title}</Text>
      </Flex>
      <svg
        id="texture"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: "$max",
          width: "100%",
          height: "100vh",
          opacity: ".25",
          pointerEvents: "none",
          filter: "contrast(120%) brightness(120%)",
        }}
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".8"
            numOctaves="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"></rect>
      </svg>
    </ThemeProvider>
  </Inline>
);

const query = {
  title: "User interface.",
};

export const pedro = { name: "pedro", code, query };
