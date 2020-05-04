import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();
const appointmentsRepository = new AppointmentsRepository();

routes.use(ensureAuthenticated);

// routes.get('/', async (_, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

routes.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmnet = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointmnet.execulte({
    date: parsedDate,
    providerId,
  });

  return res.json(appointment);
});

export default routes;
