import ILogsRepository from '@modules/minutes/repositories/ILogsRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateLogDTO from '@modules/minutes/dtos/ICreateLogDTO';
import Log from '../entities/Log';

class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Log>;
  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async create(log: ICreateLogDTO): Promise<Log> {
    const createLog = this.ormRepository.create(log);

    await this.ormRepository.save(createLog);

    return createLog;
  }
}

export default LogsRepository;
