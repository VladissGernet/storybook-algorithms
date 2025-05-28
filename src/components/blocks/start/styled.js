import styled from 'styled-components';

const StyledPage = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  font-family: 'Roboto', sans-serif;

  h1,p {
    margin: 0 0 20px;
  }

  p {
    font-size: 1.3rem;
  }

  background-color: #969696;
  margin: -1rem;
  padding: 2rem;
  min-height: 100vh;
`;

export { StyledPage };
