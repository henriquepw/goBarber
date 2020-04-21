import React from 'react';
import { ThemeProvider } from 'styled-components';

import SignUp from './pages/SignUp';

import GlobalStyle from './styles/global';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SignUp />
    </ThemeProvider>
  );
};

export default App;
