import React from 'react';
import { ThemeProvider } from 'styled-components';

import SignIn from './pages/SignIn';

import { AuthProvider } from './contexts/AuthContext';

import GlobalStyle from './styles/global';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
