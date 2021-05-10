import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMinuteService from '@modules/minutes/services/CreateMinuteService';

export default class MinutesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const minute = request.body;
    const userId = request.user.id;

    Object.assign(minute.minute, { user_id: userId });

    const cretaeMinute = container.resolve(CreateMinuteService);

    const createdMinute = await cretaeMinute.execute(minute);

    return response.json(createdMinute);
  }
}
