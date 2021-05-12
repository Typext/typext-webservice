import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMinuteService from '@modules/minutes/services/CreateMinuteService';
import GetMinuteService from '@modules/minutes/services/GetMinuteService';

export default class MinutesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const minute = request.body;
    const userId = request.user.id;

    Object.assign(minute.minute, { user_id: userId });

    const cretaeMinute = container.resolve(CreateMinuteService);

    const createdMinute = await cretaeMinute.execute(minute);

    return response.json(createdMinute);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const minuteId = request.params.id;
    const userType = request.user.type;

    const getMinuteService = container.resolve(GetMinuteService);

    const createdMinute = await getMinuteService.execute({
      userType,
      minuteId,
    });

    return response.json(createdMinute);
  }
}
