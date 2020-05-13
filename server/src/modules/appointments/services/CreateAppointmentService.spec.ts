import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
  });

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 14),
      providerId: 'provider-id',
      userId: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('provider-id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 15);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: 'provider-id',
      userId: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        providerId: 'user-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8an and after 5pm', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
