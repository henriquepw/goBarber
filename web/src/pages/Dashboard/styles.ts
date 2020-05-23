import styled from 'styled-components';
import { shade } from 'polished';

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

export const Content = styled.main`
  display: flex;

  max-width: 1120px;
  margin: 64px auto;
`;

export const Schedule = styled.section`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 3.6rem;
  }

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.active};
    font-weight: 500;

    &,
    span {
      display: flex;
      align-items: center;

      text-transform: capitalize;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;

      margin: 0 8px;

      background: ${({ theme }) => theme.colors.active};
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 2rem;
    font-weight: 400;

    color: ${({ theme }) => theme.colors.secundaryText};
    opacity: 0.8;
  }

  div {
    display: flex;
    align-items: center;

    margin-top: 24px;
    padding: 16px 24px;
    border-radius: 10px;
    position: relative;

    background: ${({ theme }) => theme.colors.card};

    &::before {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.colors.active};

      height: 80%;
      width: 2px;

      top: 10%;
      left: 0;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${({ theme }) => theme.colors.primaryText};
      font-size: 2rem;
    }

    span {
      display: flex;
      align-items: center;

      margin-left: auto;
      color: ${({ theme }) => theme.colors.secundaryText};
      opacity: 0.8;

      svg {
        margin-right: 8px;
        color: ${({ theme }) => theme.colors.active};
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    display: block;

    color: ${({ theme }) => theme.colors.secundaryText};
    opacity: 0.8;

    font-size: 2rem;
    line-height: 26px;

    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.card};
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    width: 70px;

    margin-left: auto;
    color: ${({ theme }) => theme.colors.primaryText};

    svg {
      margin-right: 8px;
      color: ${({ theme }) => theme.colors.active};
    }
  }

  div {
    display: flex;
    align-items: center;
    flex: 1;

    margin-left: 24px;
    padding: 16px 24px;
    border-radius: 10px;

    background: ${({ theme }) => theme.colors.card};

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: ${({ theme }) => theme.colors.primaryText};
      font-size: 1.8rem;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;

    font-size: 1.6rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
