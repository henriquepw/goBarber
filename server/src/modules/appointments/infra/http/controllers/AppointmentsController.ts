import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { providerId, date } = req.body;

    const createAppointmnet = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmnet.execute({
      date,
      userId: req.user.id,
      providerId,
    });

    return res.json(classToClass(appointment));
  }
}

export default AppointmentsController;
