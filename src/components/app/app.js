import React from "react";
import { GlobalStyle } from './styles.js';

import { PageWrapper } from '/src/components/layout/page-wrapper/page-wrapper';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <PageWrapper />
    </>
  );
}
