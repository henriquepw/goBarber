import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const routes = Router();
const upload = multer(uploadConfig);

// routes.get('/', async () => {});

routes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

routes.use(ensureAuthenticated);

routes.patch('/avatar', upload.single('avatar'), async (req, res) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    userId: req.user.id,
    avatarFilename: req.file.filename,
  });

  delete user.password;

  return res.json(user);
});

export default routes;
