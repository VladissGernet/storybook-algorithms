import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { Sorting1 } from "./sorting-1";
import { Sorting2 } from "./sorting-2";
import { Sorting3 } from "./sorting-3";

export const bubbleAndQuickAndInsertionkSorts = () => (
  <StyledPage>
    <Sorting1 />
  </StyledPage>
);

export const linkedLists = () => (
  <StyledPage>
    <Sorting2 />
  </StyledPage>
);

export const sortingHometask = () => (
  <StyledPage>
    <Sorting3 />
  </StyledPage>
);

export default {
  title: "Сортировка",
};
