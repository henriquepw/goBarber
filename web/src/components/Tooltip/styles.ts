import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;

    width: 160px;

    left: 50%;
    bottom: calc(100% + 12px);
    transform: translateX(-50%);

    background: ${({ theme }) => theme.colors.active};
    color: ${({ theme }) => theme.colors.background};

    padding: 8px;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 500;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s;

    &::before {
      content: '';
      position: absolute;

      border-style: solid;
      border-color: ${({ theme }) => theme.colors.active} transparent;
      border-width: 6px 6px 0 6px;

      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
  }
`;
