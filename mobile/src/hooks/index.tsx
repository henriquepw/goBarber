import React from 'react';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './auth';

import theme from '../styles/theme';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
