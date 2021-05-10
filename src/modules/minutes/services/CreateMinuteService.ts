/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import { addHours } from 'date-fns';

import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';
import ITopicsRepository from '../repositories/ITopicsRepository';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  minute: {
    start_date: Date;
    end_date: Date;
    minute_number: string;
    place: string;
    project: string;
    schedules: string[];
    areas: string[];
    status: string;
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

  public async execute(minute: IRequest): Promise<Minute> {
    Object.assign(minute.minute, { status: 'nova' });

    const endDate = new Date();
    minute.minute.end_date = addHours(endDate, -3);

    console.log(minute.minute.end_date);

    const createMinute = await this.minutesRepository.create(minute.minute);

    for (const participant of minute.participant) {
      Object.assign(participant, { minute_id: createMinute.id });
      this.participantsRepository.create(participant);
    }

    for (const topic of minute.topic) {
      Object.assign(topic, { minute_id: createMinute.id });
      this.topicsRepository.create(topic);
    }

    await this.logsRepository.create({
      user_id: createMinute.user_id,
      minute_id: createMinute.id,
      registered_action: 'Criação de ata',
    });

    return minute;
  }
}

export default CreateMinuteService;
