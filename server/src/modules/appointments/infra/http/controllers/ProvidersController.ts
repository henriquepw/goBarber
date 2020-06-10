import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersServices from '@modules/appointments/services/ListProvidersServices';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProviders = container.resolve(ListProvidersServices);

    const providers = await listProviders.execute(req.user.id);

    return res.json(classToClass(providers));
  }
}

export default ProvidersController;
