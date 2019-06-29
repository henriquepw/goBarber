import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddware from './app/middwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.post('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddware);

routes.route('/users').put(UserController.update);

routes.route('/files').post(upload.single('file'), FileController.store);

export default routes;
