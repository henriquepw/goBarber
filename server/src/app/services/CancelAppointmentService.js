import { isBefore, subHours } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';

import CancellationMail from '../jobs/CancellationMail';

import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

class AppointmentError extends Error {
  constructor(status, ...args) {
    super(...args);
    this.status = status;
  }
}

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== user_id) {
      throw new AppointmentError(
        401,
        "You don't have permission to cancel this appointment"
      );
    }

    const deadline = subHours(appointment.date, 2);
    if (isBefore(deadline, new Date())) {
      throw new AppointmentError(
        401,
        'You can only cancel appointments 2 hours is advance'
      );
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });

    /**
     * Invalidade cache
     */
    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
