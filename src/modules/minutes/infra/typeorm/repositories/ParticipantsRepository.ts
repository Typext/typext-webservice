import IParticipantsRepository from '@modules/minutes/repositories/IParticipantsRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateParticipantDTO from '@modules/minutes/dtos/ICreateParticipantDTO';
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

  public async index(minuteId: number): Promise<Participant[]> {
    const foundTopics = await this.ormRepository.find({
      where: { minute_id: minuteId },
    });
    return foundTopics;
  }
}

export default ParticipantsRepository;
