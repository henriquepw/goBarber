import React from 'react';
import { render } from 'react-native-testing-library';

import { ThemeProvider } from 'styled-components';
import SignIn from '../../pages/SignIn';
import theme from '../../styles/theme';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('SignIn page', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholder } = render(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>,
    );

    expect(getByPlaceholder('E-mail')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});
