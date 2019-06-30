import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddware from './app/middwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddware);

routes.route('/users').put(UserController.update);

routes.route('/providers').get(ProviderController.index);

routes
  .route('/appointments')
  .get(AppointmentController.index)
  .post(AppointmentController.store);

routes.route('/schedule').get(ScheduleController.index);

routes.route('/files').post(upload.single('file'), FileController.store);

export default routes;
