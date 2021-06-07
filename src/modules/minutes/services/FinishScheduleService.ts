/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';
import ITopicsRepository from '../repositories/ITopicsRepository';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  minute: {
    start_date: Date;
    end_date: Date;
    place: string;
    project: string;
    schedules: string[];
    areas: string[];
    status: string;
    minute_id: string;
    user_id: string;
  };
  participant: {
    minute_id: number;
    name: string;
    email: string;
    title: string;
    company: string;
    phone: string;
    digital_signature: boolean;
  };
  topic: {
    minute_id: number;
    name: string;
    responsible: string;
    deadline: Date;
  };
}

@injectable()
class CreateMinuteService {
  constructor(
    @inject('MinutesRepository')
    private minutesRepository: IMinutesRepository,

    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository,

    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(minuteData: IRequest): Promise<Minute> {
    const findMinute = await this.minutesRepository.findById(
      minuteData.minute.minute_id.id,
    );

    if (!findMinute) {
      throw new AppError('Minute not found', 404);
    }

    Object.assign(findMinute, {
      user_id: minuteData.minute.user_id,
    });

    findMinute.end_date = new Date();

    findMinute.status = 'nova';

    console.log(findMinute);

    const createMinute = await this.minutesRepository.save(findMinute);

    await this.logsRepository.create({
      user_id: createMinute.user_id,
      minute_id: createMinute.id,
      registered_action: 'Criação de ata',
    });

    return findMinute;
  }
}

export default CreateMinuteService;
