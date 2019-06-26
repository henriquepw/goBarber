import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', async (_, res) => res.send('Wellcome gobaber'));

routes.route('/users').post(UserController.store);

export default routes;
