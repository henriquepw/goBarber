import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', async (_, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

routes.post('/', async (req, res) => {
  try {
    const { providerId, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmnet = new CreateAppointmentService();

    const appointment = await createAppointmnet.execulte({
      date: parsedDate,
      providerId,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;
