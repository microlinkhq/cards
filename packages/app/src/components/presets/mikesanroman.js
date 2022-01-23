/* eslint-disable no-use-before-define */

import Inline from "../inline.macro";
import { Box, Flex, Text, Link } from "./scope";

const code = (
  <Inline>
    <>
      <Link
        href="https://fonts.googleapis.com/css?family=Titillium+Web:600&display=block"
        rel="stylesheet"
      />
      <Flex
        sx={{
          backgroundColor: "#FBF9FC",
          fontFamily: "Titillium Web",
          fontSize: 64,
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          pl: 64,
          pb: 40,
          pr: 40,
          height: "100%",
        }}
      >
        <Text
          sx={{
            maxWidth: 576,
            lineHeight: 1.2,
            color: "#141314",
          }}
        >
          {query.title}
        </Text>

        <Box
          as="img"
          src="https://msanroman.io/logo-light.svg"
          sx={{
            alignSelf: "flex-end",
            justifySelf: "flex-end",
            display: "block",
            position: "absolute",
            width: 158,
            height: 48,
            bottom: 40,
            right: 40,
          }}
        />
      </Flex>
    </>
  </Inline>
);

const query = {
  title: "The value of software is not what you think it is",
};

export const mikesanroman = { name: "mikesanroman", code, query };
