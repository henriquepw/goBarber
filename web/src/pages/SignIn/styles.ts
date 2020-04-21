import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: flex;
  align-items: stretch;

  min-height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;

  form {
    width: 340px;
    margin: 80px 0;

    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      display: block;
      margin-top: 24px;

      color: ${({ theme }) => theme.colors.secundaryText};
      transition: color 0.2s ease-out;

      &:hover {
        color: ${({ theme }) => shade(0.2, theme.colors.secundaryText)};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.active};
    transition: color 0.2s ease-out;

    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.active)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
