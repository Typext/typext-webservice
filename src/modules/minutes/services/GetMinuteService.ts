/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { json } from 'express';
import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';
import ITopicsRepository from '../repositories/ITopicsRepository';
import IGetMinuteDTO from '../dtos/IGetMinuteDTO';
import ICompleteMinuteResponseDTO from '../dtos/ICompleteMinuteResponseDTO';

@injectable()
class GetMinuteService {
  constructor(
    @inject('MinutesRepository')
    private minutesRepository: IMinutesRepository,

    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository,

    @inject('TopicsRepository')
    private topicsRepository: ITopicsRepository,
  ) {}

  public async execute({
    userType,
    minuteId,
  }: IGetMinuteDTO): Promise<ICompleteMinuteResponseDTO | undefined> {
    const allowedUserTypes = ['Admin', 'Gerente'];

    if (allowedUserTypes.indexOf(userType) === -1) {
      throw new AppError('Permission Denied');
    }

    const foundMinute = await this.minutesRepository.show({
      userType,
      minuteId,
    });

    const foundTopics = await this.topicsRepository.index(minuteId);

    const foundParticipants = await this.participantsRepository.index(minuteId);

    if (!foundMinute) {
      throw new AppError('Minute not found', 404);
    }

    const finalMinute = {
      minute: foundMinute,
      topics: foundTopics,
      participants: foundParticipants,
    };
    return finalMinute;
  }
}

export default GetMinuteService;
