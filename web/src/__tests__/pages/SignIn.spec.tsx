import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { ThemeProvider } from 'styled-components';

import SignIn from '../../pages/SignIn';
import theme from '../../styles/theme';

interface LinkProps {
  children: React.ReactNode;
}
const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: LinkProps) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn page', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>,
    );

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    act(() => {
      fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
      fireEvent.change(passwordField, { target: { value: '123123' } });

      fireEvent.click(buttonElement);
    })

    await waitFor(() =>
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard'),
    );
  });
});
