import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: ${({ theme }) => theme.colors.secundaryBackground};
  border: 2px solid ${({ theme }) => theme.colors.secundaryBackground};
  border-radius: 10px;

  width: 100%;

  padding: 16px;

  & + div {
    margin-top: 8px;
  }

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
    color: ${({ theme }) => theme.colors.placeHolder};
  }
`;
