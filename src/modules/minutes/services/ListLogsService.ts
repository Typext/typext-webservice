import { inject, injectable } from 'tsyringe';

import Log from '../infra/typeorm/entities/Log';
import ILogsRepository from '../repositories/ILogsRepository';

@injectable()
class ListLogsService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(): Promise<Log[]> {
    const logs = await this.logsRepository.findAll();

    return logs;
  }
}

export default ListLogsService;
