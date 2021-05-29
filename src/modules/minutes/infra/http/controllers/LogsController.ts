import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListLogsService from '@modules/minutes/services/ListLogsService';

export default class LogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLogs = container.resolve(ListLogsService);

    const logs = await listLogs.execute();

    return response.json(logs);
  }
}
