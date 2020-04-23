import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.placeHolder};
  background: ${({ theme }) => theme.colors.secundaryBackground};
  border: 2px solid ${({ theme }) => theme.colors.secundaryBackground};
  border-radius: 10px;

  width: 100%;
  padding: 16px;

  & + div {
    margin-top: 8px;
  }

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      color: ${theme.colors.active};
      border-color: ${theme.colors.active};
    `}

  ${({ isFilled, theme }) =>
    isFilled &&
    css`
      color: ${theme.colors.active};
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: ${({ theme }) => shade(0.2, theme.colors.secundaryText)};
    outline: 0;

    &::placeholder {
      color: ${({ theme }) => theme.colors.placeHolder};
    }
  }

  svg {
    margin-right: 16px;
  }
`;
