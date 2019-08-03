import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AvailableController from './app/controllers/AvailableController';
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import validadeAppointmentStore from './app/validators/AppointmentStore';
import validadeSessionStore from './app/validators/SessionStore';
import validadeUserStore from './app/validators/UserStore';
import validadeUserUpdate from './app/validators/UserUpdate';

import authMiddware from './app/middwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.post('/session', validadeSessionStore, SessionController.store);
routes.post('/users', validadeUserStore, UserController.store);

routes.use(authMiddware);

routes.put('/users', validadeUserUpdate, UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes
  .route('/appointments')
  .get(AppointmentController.index)
  .post(validadeAppointmentStore, AppointmentController.store);

routes.delete('/appointments/:id', AppointmentController.delete);

routes.route('/schedule').get(ScheduleController.index);

routes.route('/notifications').get(NotificationController.index);
routes.route('/notifications/:id').put(NotificationController.update);

routes.route('/files').post(upload.single('file'), FileController.store);

export default routes;
