import { inject, injectable } from 'tsyringe';

import ICreateMinuteDTO from '../dtos/ICreateMinuteDTO';
import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';
import ILogsRepository from '../repositories/ILogsRepository';

@injectable()
class CreateMinuteService {
  constructor(
    @inject('MinutesRepository')
    private minutesRepository: IMinutesRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(minute: ICreateMinuteDTO): Promise<Minute> {
    const createMinute = await this.minutesRepository.create(minute);

    await this.logsRepository.create({
      user_id: createMinute.user_id,
      minute_id: createMinute.id,
      registered_action: 'Criação de ata',
    });

    return createMinute;
  }
}

export default CreateMinuteService;
