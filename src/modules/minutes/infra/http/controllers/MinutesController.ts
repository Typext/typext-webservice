import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMinuteService from '@modules/minutes/services/CreateMinuteService';
import GetMinuteService from '@modules/minutes/services/GetMinuteService';
import ListMinuteService from '@modules/minutes/services/ListMinuteService';
import SignMinuteService from '@modules/minutes/services/SignMinuteService';
import UpdateMinuteService from '@modules/minutes/services/UpdateMinuteService';

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
    const minuteIdString = request.params.id;
    const userType = request.user.type;
    const minuteId = Number(minuteIdString);

    const getMinuteService = container.resolve(GetMinuteService);

    const createdMinute = await getMinuteService.execute({
      userType,
      minuteId,
    });

    return response.json(createdMinute);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listMinutes = container.resolve(ListMinuteService);

    const minutes = await listMinutes.execute();

    return response.json(minutes);
  }

  public async sign(request: Request, response: Response): Promise<Response> {
    const serviceRequest = request.body;

    const signMinuteService = container.resolve(SignMinuteService);

    const signedParticipant = await signMinuteService.execute(serviceRequest);

    return response.json(signedParticipant);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateMinuteDTO = request.body;

    const updateMinuteService = container.resolve(UpdateMinuteService);

    const updatedMinute = await updateMinuteService.execute(updateMinuteDTO);

    return response.json(updatedMinute);
  }
}
