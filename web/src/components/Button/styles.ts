import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: ${({ theme }) => theme.colors.active};
  color: ${({ theme }) => theme.colors.background};

  width: 100%;
  height: 56px;

  border: 0;
  border-radius: 10px;
  font-weight: 500;

  padding: 16px;
  margin-top: 16px;
  transition: background 0.2s ease-out;

  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.active)};
  }
`;
