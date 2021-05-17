/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';
import ITopicsRepository from '../repositories/ITopicsRepository';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  minute_id: number;
  minute: {
    start_date: Date;
    end_date: Date;
    place: string;
    project: string;
    schedules: string[];
    areas: string[];
    status: string;
    user_id: string;
    file_id?: string;
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
    const minute = await this.minutesRepository.findById(minuteData.minute_id);

    if (!minute) {
      throw new AppError('Minute not found', 404);
    }

    Object.assign(minute, {
      areas: minuteData.minute.areas,
      file_id: minuteData.minute.file_id,
      place: minuteData.minute.place,
      project: minuteData.minute.project,
      schedules: minuteData.minute.schedules,
      start_date: minuteData.minute.start_date,
    });

    const savedMinute = await this.minutesRepository.save(minute);

    return savedMinute;
  }
}

export default CreateMinuteService;
