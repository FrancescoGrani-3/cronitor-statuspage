import useSetState from 'react-use-setstate';
import { ThemeProvider } from 'styled-components'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vis/dist/style.css';

import Layouts from '../components/layouts'
import theme, { GlobalStyle, ThemeContext } from '../constants/theme';
import '../styles/globals.css'

const themeMode = Cookies.get('theme') || 'light'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useSetState({
    themeMode,
  })

  return (<ThemeContext.Provider value={{
    mode: state.themeMode,
    toggleMode: () => {
      const newTheme = state.themeMode === 'dark' ? 'light' : 'dark'
      Cookies.set('theme', newTheme)
      setState({ themeMode: newTheme })
    }
  }}>
    <ThemeProvider theme={theme(state.themeMode)}>
      <GlobalStyle />
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </ThemeProvider>
  </ThemeContext.Provider>)
}

export default MyApp
