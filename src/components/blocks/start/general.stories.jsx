import React from "react";

import { StyledPage } from "./styled";

import { General1 } from "./general-1";
import { General2 } from "./general-2";

export const General1Start = () => (
  <StyledPage>
    <General1 />
  </StyledPage>
);

export const General2Start = () => (
  <StyledPage>
    <General2 />
  </StyledPage>
);

export default {
  title: "Общее",
};
