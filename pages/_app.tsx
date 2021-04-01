import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: rgb(85,8,139);
    background: radial-gradient(circle, rgba(181,111,230,1) 48%, rgba(85,8,139,1) 100%);
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
