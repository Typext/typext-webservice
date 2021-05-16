/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ISignMinuteDTO from '@modules/minutes/dtos/ISignMinuteDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Participant from '../infra/typeorm/entities/Participant';
import IReviewsRepository from '../repositories/IReviewRepository';
import ILogsRepository from '../repositories/ILogsRepository';
import IMinutesRepository from '../repositories/IMinutesRepository';
import IParticipantsRepository from '../repositories/IParticipantsRepository';

@injectable()
class SignMinuteService {
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

  public async execute(signRequest: ISignMinuteDTO): Promise<Participant> {
    const minuteId = signRequest.minute_id;

    const participant = await this.participantsRepository.show(signRequest);

    if (!participant) {
      throw new AppError('Participante não pertence à ata');
    } else {
      participant.digital_signature = true;
    }

    const participantAfterSign = await this.participantsRepository.save(
      participant,
    );

    const numberOfParticipants = await this.participantsRepository.countParticipants(
      minuteId,
    );

    const numberOfParticipantsWhoSigned = await this.participantsRepository.countParticipantsWhoSigned(
      minuteId,
    );

    if (numberOfParticipants === numberOfParticipantsWhoSigned) {
      const currentMinute = await this.minutesRepository.findById(minuteId);

      if (!currentMinute) {
        throw new AppError('Minuta não encontrada', 404);
      } else {
        currentMinute.status = 'assinada';
        await this.minutesRepository.save(currentMinute);
      }
    }

    return participantAfterSign;
  }
}

export default SignMinuteService;
