import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { GreedyAlgorithms1 } from "./greedy-algorithms-1";
import { GreedyAlgorithms2 } from "./greedy-algorithms-2";

export const appointments = () => (
  <StyledPage>
    <GreedyAlgorithms1 />
  </StyledPage>
);

export const minigame = () => (
  <StyledPage>
    <GreedyAlgorithms2 />
  </StyledPage>
);

export default {
  title: "Жадные лгоритмы",
};
