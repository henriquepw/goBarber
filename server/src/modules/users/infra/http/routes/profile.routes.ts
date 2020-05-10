import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const usersRoutes = Router();

const profileController = new ProfileController();

usersRoutes
  .route('/')
  .all(ensureAuthenticated)
  .put(profileController.update)
  .get(profileController.show);

export default usersRoutes;
