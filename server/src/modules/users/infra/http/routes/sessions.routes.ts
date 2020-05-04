import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default routes;
