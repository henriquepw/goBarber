import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter
  .route('/')
  .all(ensureAuthenticated)
  .put(profileController.update)
  .get(profileController.show);

export default profileRouter;
