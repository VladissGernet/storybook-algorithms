import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { Search1 } from "./search-1";
import { Search2 } from "./search-2";

export const SearchBinary = () => (
  <StyledPage>
    <Search1 />
  </StyledPage>
);

export const SearchHometask = () => (
  <StyledPage>
    <Search2 />
  </StyledPage>
);

export default {
  title: "Поиск",
};
