import { inject, injectable } from 'tsyringe';

import Log from '../infra/typeorm/entities/Log';
import ILogsRepository from '../repositories/ILogsRepository';

@injectable()
class ListLogsService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(id: number): Promise<Log[]> {
    const logs = await this.logsRepository.findByMinute(id);

    return logs;
  }
}

export default ListLogsService;
