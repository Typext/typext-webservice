import IParticipantsRepository from '@modules/minutes/repositories/IParticipantsRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateParticipantDTO from '@modules/minutes/dtos/ICreateParticipantDTO';
import ISignMinuteDTO from '@modules/minutes/dtos/ISignMinuteDTO';
import Participant from '../entities/Participant';

class ParticipantsRepository implements IParticipantsRepository {
  private ormRepository: Repository<Participant>;
  constructor() {
    this.ormRepository = getRepository(Participant);
  }

  public async create(
    participant: ICreateParticipantDTO,
  ): Promise<Participant> {
    const createParticipant = this.ormRepository.create(participant);

    await this.ormRepository.save(createParticipant);

    return createParticipant;
  }

  public async show(request: ISignMinuteDTO): Promise<Participant | undefined> {
    const foundParticipant = await this.ormRepository.findOne({
      where: { minute_id: request.minute_id, email: request.participant_email },
    });
    return foundParticipant;
  }

  public async index(minuteId: number): Promise<Participant[]> {
    const foundTopics = await this.ormRepository.find({
      where: { minute_id: minuteId },
    });
    return foundTopics;
  }

  public async save(participant: Participant): Promise<Participant> {
    const savedParticipant = await this.ormRepository.save(participant);
    return savedParticipant;
  }

  public async countParticipants(minuteId: number): Promise<number> {
    const numberOfParticipants = await this.ormRepository.count({
      where: { minute_id: minuteId },
    });
    return numberOfParticipants;
  }

  public async countParticipantsWhoSigned(minuteId: number): Promise<number> {
    const numberOfParticipantsWhoSigned = await this.ormRepository.count({
      where: { minute_id: minuteId, digital_signature: true },
    });
    return numberOfParticipantsWhoSigned;
  }
}

export default ParticipantsRepository;
