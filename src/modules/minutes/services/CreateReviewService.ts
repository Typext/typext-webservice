/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import ICreateReviewDTO from '@modules/minutes/dtos/ICreateReviewDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
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

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(reviewDTO: ICreateReviewDTO): Promise<Review> {
    const minuteId = reviewDTO.minute_id;
    const minute = await this.minutesRepository.findById(minuteId);

    if (!minute) {
      throw new AppError('Minute not found', 404);
    }

    const statusThatCanReceiveARevision = ['nova', 'revisada'];

    if (statusThatCanReceiveARevision.indexOf(minute.status) === -1) {
      throw new AppError(
        `Apenas atas nos status seguintes status podem ser revisadas: ${statusThatCanReceiveARevision}`,
      );
    }

    minute.status = 'revisada';

    await this.minutesRepository.save(minute);

    const participants = await this.participantsRepository.index(minuteId);

    if (!participants) {
      throw new AppError('Participants were not found for this minute id', 404);
    }

    const newReview = path.resolve(
      __dirname,
      '..',
      'views',
      'new_revision.hbs',
    );

    for (const participant of participants) {
      participant.digital_signature = false;

      this.mailProvider.sendMail({
        to: {
          name: participant.name,
          email: participant.email,
        },
        subject: '[Typext] Nova revisão de ata com assinatura pendente',
        templateData: {
          file: newReview,
          variables: {
            name: participant.name,
            link: `${process.env.APP_WEB_URL}/sign-minute/${minuteId}/${participant.email}`,
          },
        },
      });

      await this.participantsRepository.save(participant);
    }

    const createdReview = await this.reviewsRepository.create(reviewDTO);

    await this.logsRepository.create({
      user_id: reviewDTO.user_id,
      minute_id: minuteId,
      registered_action: 'Criação de revisão',
    });

    return createdReview;
  }
}

export default CreateMinuteService;
