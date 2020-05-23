import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { format, parseISO, isAfter, isToday } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { FiPower, FiClock } from 'react-icons/fi';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import api from '../../services/api';

const defaultAvatarUrl =
  'https://api.adorable.io/avatars/285/abott@adorable.png';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const disabledDays = useMemo(
    () =>
      monthAvailability
        .filter((monthDay) => !monthDay.available)
        .map((monthDay) => {
          const year = currentMonth.getFullYear();
          const month = currentMonth.getMonth();

          return new Date(year, month, monthDay.day);
        }),
    [currentMonth, monthAvailability],
  );

  const selectedDateAsText = useMemo(
    () => format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBr }),
    [selectedDate],
  );

  const selectedWeekDay = useMemo(
    () => format(selectedDate, 'cccc', { locale: ptBr }),
    [selectedDate],
  );

  const nextAppointment = useMemo(
    () => appointments.find(({ date }) => isAfter(parseISO(date), new Date())),
    [appointments],
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.date).getHours() < 12,
      ),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.date).getHours() >= 12,
      ),
    [appointments],
  );

  useEffect(() => {
    async function loadMonthAvailability(): Promise<void> {
      const response = await api.get(
        `/providers/${user.id}/month-availability`,
        {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        },
      );

      setMonthAvailability(response.data);
    }

    loadMonthAvailability();
  }, [currentMonth, user.id]);

  useEffect(() => {
    async function loadAppointments(): Promise<void> {
      const response = await api.get<Appointment[]>(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });

      const formattedAppointments = response.data.map((appointment) => {
        const { avatarUrl } = appointment.user;

        return {
          ...appointment,
          user: {
            ...appointment.user,
            avatarUrl: avatarUrl || defaultAvatarUrl,
          },
          formattedHour: format(parseISO(appointment.date), 'HH:mm'),
        };
      });

      setAppointments(formattedAppointments);
    }

    loadAppointments();
  }, [selectedDate]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatarUrl || defaultAvatarUrl} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatarUrl}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>

                <span>
                  <FiClock />
                  {nextAppointment.formattedHour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {!morningAppointments.length && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatarUrl}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {!afternoonAppointments.length && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatarUrl}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: {
                daysOfWeek: [1, 2, 3, 4, 5],
              },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
