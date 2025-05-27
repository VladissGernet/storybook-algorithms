import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body,
  html {
    margin: 0;
    height: 100%;
  }

  body {
    position: relative;
    font-family: ${(props) => props.theme.fontFamily};
    font-size: ${(props) => props.theme.fontSizeDefault};
    line-height: 27px;
    font-weight: 400;
    color: ${(props) => props.theme.colorBlackForText};

    background-color: grey;
  }

  ${'' /* Sticky footer */}
  body>div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  main {
    flex-grow: 1;
  }
`;
