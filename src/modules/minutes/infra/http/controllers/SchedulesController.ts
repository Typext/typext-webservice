import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateScheduleService from '@modules/minutes/services/CreateScheduleService';
import DeleteScheduleMeetingService from '@modules/minutes/services/DeleteScheduleMeetingService';
import FinishScheduleService from '@modules/minutes/services/FinishScheduleService';

export default class MinutesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schedule = request.body;
    const userId = request.user.id;

    Object.assign(schedule.minute, { user_id: userId });

    const cretaeSheduleSevice = container.resolve(CreateScheduleService);

    const createdSchedule = await cretaeSheduleSevice.execute(schedule);

    return response.json(createdSchedule);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const schedule = request.body;
    const userId = request.user.id;
    const MinuteId = request.params;

    Object.assign(schedule.minute, { user_id: userId, minute_id: MinuteId });

    // console.log(schedule);

    const finishSheduleSevice = container.resolve(FinishScheduleService);

    const finishSchedule = await finishSheduleSevice.execute(schedule);

    return response.json(finishSchedule);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userId = request.user.id;

    const { minuteId } = request.params;

    const scheduleMeeting = container.resolve(DeleteScheduleMeetingService);

    await scheduleMeeting.execute({
      userId,
      minuteId: Number(minuteId),
    });

    return response.json({
      message: 'Schedule meeting has been deleted',
    });
  }
}
