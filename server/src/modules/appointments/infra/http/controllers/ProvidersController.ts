import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersServices from '@modules/appointments/services/ListProvidersServices';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProviders = container.resolve(ListProvidersServices);

    const providers = await listProviders.execute(req.user.id);

    providers.forEach((_, index) => {
      delete providers[index].password;
    });

    return res.json(providers);
  }
}

export default ProvidersController;
