/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICreateReviewDTO from '@modules/minutes/dtos/ICreateReviewDTO';
import { addHours } from 'date-fns';
import Review from '../infra/typeorm/entities/MinuteReview';
import IReviewsRepository from '../repositories/IReviewRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';

@injectable()
class CreateMinuteService {
  constructor(
    @inject('MinutesRepository')
    private minutesRepository: IMinutesRepository,

    @inject('ParticipantsRepository')
    private participantsRepository: IParticipantsRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute(request: ICreateReviewDTO): Promise<Review | undefined> {
    const minuteId = request.minute_id;
    const minute = await this.minutesRepository.show(minuteId);

    if (!minute) {
      throw new AppError('Minute not found', 404);
    }

    const statusThatCanReceiveARevision = ['nova', 'revisada'];

    if (statusThatCanReceiveARevision.indexOf(minute.status) === -1) {
      throw new AppError(
        `Apenas atas nos status seguintes status podem ser revisadas: ${statusThatCanReceiveARevision}`,
      );
    }

    const participants = await this.participantsRepository.index(minuteId);

    participants.forEach(participant => {
      participant.digital_signature = false;
    });
    minute.status = 'revisada';

    const createdReview = await this.reviewsRepository.create(request);

    // TODO
    // Enviar email para todos os participantes assinarem

    await this.logsRepository.create({
      user_id: minute.user_id,
      minute_id: minuteId,
      registered_action: 'Criação de revisão',
    });

    return createdReview;
  }
}

export default CreateMinuteService;
