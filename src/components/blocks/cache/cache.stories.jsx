import React from "react";

import { StyledPage } from "/src/components/blocks/start/styled";

import { Cache1 } from "./cache-1";
import { Cache2 } from "./cache-2";
import { Cache3 } from "./cache-3";

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

export const gameInTheGame = () => (
  <StyledPage>
    <Cache3 />
  </StyledPage>
);

export default {
  title: "Хеш-таблицы",
};
