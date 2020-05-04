import { Router } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

// routes.get('/', async (_, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

routes.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointmnet = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmnet.execulte({
    date: parsedDate,
    providerId,
  });

  return res.json(appointment);
});

export default routes;
