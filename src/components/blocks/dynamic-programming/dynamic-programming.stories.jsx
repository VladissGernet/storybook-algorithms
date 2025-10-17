import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { DynamicProgramming1 } from "./dynamic-programming-1";
import { DynamicProgramming2 } from "./dynamic-programming-2";

export const backpack = () => (
  <StyledPage>
    <DynamicProgramming1 />
  </StyledPage>
);

export const maxIncome = () => (
  <StyledPage>
    <DynamicProgramming2 />
  </StyledPage>
);

export default {
  title: "Динамическое программирование",
};
