import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;

  header {
    display: flex;
    align-items: center;

    height: 144px;
    background: ${({ theme }) => theme.colors.backgroundDark};

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      padding: 0 32px;

      a {
        color: ${({ theme }) => theme.colors.secundaryText};
        opacity: 0.5;

        transition: opacity 0.3s;

        svg {
          width: 24px;
          height: 50px;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  margin: -176px auto 0;

  width: 100%;

  form {
    width: 340px;
    margin: 80px 0;

    text-align: center;

    h1 {
      font-size: 2rem;
      text-align: left;
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
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;

  margin: 0 auto;
  margin-bottom: 32px;

  img {
    width: 186px;
    height: 186px;
    object-fit: cover;

    border-radius: 50%;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 0;
    bottom: 0;

    width: 48px;
    height: 48px;

    border-radius: 50%;
    border: 0;

    background: ${({ theme }) => theme.colors.active};
    transition: background 0.2s;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;

      color: ${({ theme }) => theme.colors.background};
    }

    input {
      display: none;
    }

    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.active)};
    }
  }
`;
