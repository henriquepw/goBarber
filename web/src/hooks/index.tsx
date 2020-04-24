import React from 'react';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

import theme from '../styles/theme';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
