import styled, { ServerStyleSheet, ThemeProvider } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vis/dist/style.css';

import theme, { GlobalStyle } from '../constants/theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}

export default MyApp
