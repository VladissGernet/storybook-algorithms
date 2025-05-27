import React from 'react';

import { Header } from '/src/components/layout/header/header';
import { Footer } from '/src/components/layout/footer/footer';
import { Main } from './styled';

const PageWrapper = () => {
  return (
    <>
      <Header />
      <Main>
        Index page
      </Main>
      <Footer />
    </>
  )
};

export { PageWrapper };
