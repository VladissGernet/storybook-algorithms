import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { Tree1 } from "./tree-1";
import { Tree2 } from "./tree-2";

export const traversingDOMTree = () => (
  <StyledPage>
    <Tree1 />
  </StyledPage>
);

export const treesHometask1 = () => (
  <StyledPage>
    <Tree2 />
  </StyledPage>
);

export default {
  title: "Деревья",
};
