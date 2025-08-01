import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { Cache1 } from "./cache-1";
import { Cache2 } from "./cache-2";

export const mapCaching = () => (
  <StyledPage>
    <Cache1 />
  </StyledPage>
);

export const requestProcessingRateLimiter = () => (
  <StyledPage>
    <Cache2 />
  </StyledPage>
);

export default {
  title: "Хеш-таблицы",
};
