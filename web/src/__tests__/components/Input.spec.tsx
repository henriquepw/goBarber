import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { ThemeProvider } from 'styled-components';

import Input from '../../components/Input';
import theme from '../../styles/theme';

jest.mock('@unform/core', () => ({
  useField() {
    return {
      fieldName: 'email',
      defaultValue: '',
      error: '',
      registerField: jest.fn(),
    };
  },
}));

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="email" />
      </ThemeProvider>,
    );

    expect(getByPlaceholderText('email')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="email" />
      </ThemeProvider>,
    );

    const inputElement = getByPlaceholderText('email');
    const containerElement = getByTestId('input-container');

    act(() => {
      fireEvent.focus(inputElement);
    });

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        `border-color: ${theme.colors.active}`,
      );
      expect(containerElement).toHaveStyle(`color: ${theme.colors.active}`);
    });

    act(() => {
      fireEvent.blur(inputElement);
    });

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle(
        `border-color: ${theme.colors.active}`,
      );
      expect(containerElement).not.toHaveStyle(`color: ${theme.colors.active}`);
    });
  });

  it('should keep input border highlight when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input name="email" placeholder="email" />
      </ThemeProvider>,
    );

    const inputElement = getByPlaceholderText('email');
    const containerElement = getByTestId('input-container');

    act(() => {
      fireEvent.focus(inputElement);
    });

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        `border-color: ${theme.colors.active}`,
      );
      expect(containerElement).toHaveStyle(`color: ${theme.colors.active}`);
    });

    act(() => {
      fireEvent.change(inputElement, {
        target: { value: 'example@example.com' },
      });
      fireEvent.blur(inputElement);
    });

    await waitFor(() => {
      expect(containerElement).toHaveStyle(`color: ${theme.colors.active}`);
    });
  });
});
