import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    providerId,
    userId,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (userId === providerId) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointmnet on a past date.");
    }

    const currentHour = getHours(appointmentDate);

    if (currentHour < 8 || currentHour > 17) {
      throw new AppError(
        'You can only create an appointmnet between 8am at 5pm.',
      );
    }

    const isBooked = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (isBooked) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'at' HH:mm'h'");

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `New appointment for the day ${formattedDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
