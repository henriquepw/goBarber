import { Request, Response } from 'express';
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

    return res.json(appointment);
  }
}

export default AppointmentsController;
