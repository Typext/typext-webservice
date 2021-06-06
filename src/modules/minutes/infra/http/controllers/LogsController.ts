import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListLogsService from '@modules/minutes/services/ListLogsService';
import ShowLogsService from '@modules/minutes/services/ShowLogsService';

export default class LogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLogs = container.resolve(ListLogsService);

    const logs = await listLogs.execute();

    return response.json(logs);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line radix
    const minuteLog = parseInt(request.params.id);

    const showLog = container.resolve(ShowLogsService);

    const log = await showLog.execute(minuteLog);

    return response.json(log);
  }
}
