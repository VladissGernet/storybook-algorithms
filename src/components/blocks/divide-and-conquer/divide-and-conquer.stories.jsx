import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { DivideAndConquer1 } from "./divide-and-conquer-1";
import { DivideAndConquer2 } from "./divide-and-conquer-2";
import { DivideAndConquer3 } from "./divide-and-conquer-3";
import { DivideAndConquer4 } from "./divide-and-conquer-4";

export const SearchBinary = () => (
  <StyledPage>
    <DivideAndConquer1 />
  </StyledPage>
);

export const fibonacciNumbers = () => (
  <StyledPage>
    <DivideAndConquer2 />
  </StyledPage>
);

export const recursiveBinarySearch = () => (
  <StyledPage>
    <DivideAndConquer3 />
  </StyledPage>
);

export const findGuildAndPlacementByScore = () => (
  <StyledPage>
    <DivideAndConquer4 />
  </StyledPage>
);

export default {
  title: "Разделяй и властвуй",
};
