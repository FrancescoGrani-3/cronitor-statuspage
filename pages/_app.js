import useSetState from 'react-use-setstate';
import { ThemeProvider } from 'styled-components'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vis/dist/style.css';

import Layouts from '../components/layouts'
import theme, { GlobalStyle, ThemeContext } from '../constants/theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // const theme = useContext(ThemeContext);
  const [state, setState] = useSetState({
    themeMode: 'light'
  })

  return (<ThemeContext.Provider value={{
      mode: state.themeMode,
      toggleMode: () => {
        const newTheme = state.themeMode === 'dark' ? 'light' : 'dark'
        setState({themeMode: newTheme})
        Cookies.set('THEME', newTheme)
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
