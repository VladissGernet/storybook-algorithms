import styled from 'styled-components';

const StyledPage = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  font-family: 'Roboto', sans-serif;

  background-color: #969696;
  margin: -1rem;
  padding: 2rem;
  min-height: 100vh;

  h1,p {
    margin: 0 0 20px;
  }

  p {
    font-size: 1.3rem;
    text-indent: 30px;
  }

  summary {
    font-size: 1.3rem;
  }
`;

export { StyledPage };
