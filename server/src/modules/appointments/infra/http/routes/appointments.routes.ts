import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const routes = Router();
const appointmentsController = new AppointmentsController();

routes.use(ensureAuthenticated);

// routes.get('/', async (_, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

routes.post('/', appointmentsController.create);

export default routes;
