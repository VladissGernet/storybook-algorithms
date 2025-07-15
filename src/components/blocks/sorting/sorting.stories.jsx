import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { Sorting1 } from "./sorting-1";
import { Sorting2 } from "./sorting-2";

export const bubbleSort = () => (
  <StyledPage>
    <Sorting1 />
  </StyledPage>
);

export const linkedLists = () => (
  <StyledPage>
    <Sorting2 />
  </StyledPage>
);

export default {
  title: "Сортировка",
};
