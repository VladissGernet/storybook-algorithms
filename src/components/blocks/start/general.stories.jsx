import React from "react";

import { StyledPage } from "./styled";

import { General1 } from "./general-1";
import { General2 } from "./general-2";
import { General3 } from "./general-3";
import { General4 } from "./general-4";

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
export const General3Start = () => (
  <StyledPage>
    <General3 />
  </StyledPage>
);
export const General4Start = () => (
  <StyledPage>
    <General4 />
  </StyledPage>
);

export default {
  title: "Общее",
};
