import styled, { createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    background: "#f2f2f2",
    green: "#59bb65",
    red: "#e64a33",
    gray: "#ccc",
  
    card: {
      header: "#fafafc",
      body: "#ffffff",
    }
  },
  sizes: {
    card: {
      radius: 20,
    }
  }
};

export const GlobalStyle = createGlobalStyle`

  @media (min-width: 992px) {
    .container, .container-lg, .container-md, .container-sm {
      max-width: 700px;
    }
  }

  @media (min-width: 1200px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 800px;
    }
  }

  body {
    background-color: ${theme.colors.background};
    padding-bottom: 100px;
  }
`


export default theme;