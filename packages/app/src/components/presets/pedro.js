/* eslint-disable no-use-before-define */

import Inline from "../inline.macro";
import { ThemeProvider, Box, Flex, Text, Link } from "./scope";

const code = (
  <Inline>
    <>
      <Link
        href="https://fonts.googleapis.com/css?family=Inter:400,500&display=block"
        rel="stylesheet"
      />

      <Flex
        sx={{
          fontFamily: "Inter",
          fontSize: 35,
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
              width: 35,
              height: 35,
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
    </>
  </Inline>
);

const query = {
  title: "User interface.",
};

export const pedro = { name: "pedro", code, query };
