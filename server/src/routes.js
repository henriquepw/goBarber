import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import multer from 'multer';
import multerConfig from './config/multer';
import redisConfig from './config/redis';

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

const bruteStore = new BruteRedis(redisConfig);
const bruteForce = new Brute(bruteStore);

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.post(
  '/session',
  bruteForce.prevent,
  validadeSessionStore,
  SessionController.store
);

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
