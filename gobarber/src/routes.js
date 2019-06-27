import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.post('/session', SessionController.store);

routes.route('/users').post(UserController.store);

export default routes;
