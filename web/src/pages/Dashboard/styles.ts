import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px;
  background: ${({ theme }) => theme.colors.backgroundDark};
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  max-width: 1120px;
  margin: 0 auto;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      width: 20px;
      height: 20px;

      color: ${({ theme }) => theme.colors.secundaryText};
      opacity: 0.5;
      transition: 0.3s;
    }
  }

  button:hover svg {
    opacity: 1;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;

    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;

    margin-left: 16px;
    line-height: 24px;

    span {
      color: ${({ theme }) => theme.colors.secundaryText};
    }

    strong {
      color: ${({ theme }) => theme.colors.active};
    }
  }
`;
