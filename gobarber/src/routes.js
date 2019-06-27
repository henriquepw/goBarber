import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddware from './app/middwares/auth';

const routes = new Router();

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.post('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddware);

routes.route('/users').put(UserController.update);

export default routes;
