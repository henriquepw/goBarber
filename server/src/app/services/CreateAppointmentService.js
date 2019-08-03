import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';

class AppointmentError extends Error {
  constructor(status, ...args) {
    super(...args);
    this.status = status;
  }
}

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /**
     * Check client is provider
     */
    if (user_id === provider_id) {
      throw new AppointmentError(401, 'The provider can not schedule himself');
    }

    /**
     * Check user is provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      throw new AppointmentError(
        401,
        'You can only create appointments with providers'
      );
    }

    /**
     * Check past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      throw new AppointmentError(401, 'Past dates are not permitted');
    }

    /**
     * Check date availability
     */
    const isNotAvailable = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (isNotAvailable) {
      throw new AppointmentError(400, 'Appointment date os not available');
    }

    /**
     * Create appointment
     */
    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    /**
     * Notify provider
     */
    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    /**
     * Invalidade cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
