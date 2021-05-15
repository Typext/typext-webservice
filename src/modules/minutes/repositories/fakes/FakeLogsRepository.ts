import { uuid } from 'uuidv4';

import Log from '@modules/minutes/infra/typeorm/entities/Log';
import ICreateLogDTO from '@modules/minutes/dtos/ICreateLogDTO';
import ILogsRepository from '../ILogsRepository';

class FakeLogsRepository implements ILogsRepository {
  private logs: Log[] = [];

  public async create({
    user_id,
    minute_id,
    registered_action,
  }: ICreateLogDTO): Promise<Log> {
    const createLog = new Log();

    Object.assign(createLog, {
      id: uuid(),
      user_id,
      minute_id,
      registered_action,
    });

    this.logs.push(createLog);

    return createLog;
  }
}

export default FakeLogsRepository;
