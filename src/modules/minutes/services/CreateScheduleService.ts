/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';
import ITopicsRepository from '../repositories/ITopicsRepository';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  minute: {
    start_date: Date;
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

  public async execute(minuteData: IRequest): Promise<Minute> {
    Object.assign(minuteData.minute, {
      status: 'agendado',
      minute_number: '2021',
    });

    const createMinute = await this.minutesRepository.create(minuteData.minute);

    createMinute.minute_number = `${createMinute.id.toString()}/2021`;

    await this.minutesRepository.save(createMinute);

    for (const participant of minuteData.participant) {
      Object.assign(participant, { minute_id: createMinute.id });
      this.participantsRepository.create(participant);
    }

    for (const topic of minuteData.topic) {
      Object.assign(topic, { minute_id: createMinute.id });
      this.topicsRepository.create(topic);
    }

    await this.logsRepository.create({
      user_id: createMinute.user_id,
      minute_id: createMinute.id,
      registered_action: 'Criação de ata',
    });

    return minuteData;
  }
}

export default CreateMinuteService;
