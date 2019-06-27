import { Router } from 'express';

const routes = new Router();

routes.get('/', (_, res) => res.send('Welcome to MeetApp'));

export default routes;
