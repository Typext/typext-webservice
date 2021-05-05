import IMinutesRepository from '@modules/minutes/repositories/IMinutesRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateMinuteDTO from '@modules/minutes/dtos/ICreateMinuteDTO';
import Minute from '../entities/Minute';

class MinutesRepository implements IMinutesRepository {
  private ormRepository: Repository<Minute>;
  constructor() {
    this.ormRepository = getRepository(Minute);
  }

  public async create(minute: ICreateMinuteDTO): Promise<Minute> {
    const createMinute = this.ormRepository.create(minute);

    await this.ormRepository.save(createMinute);

    return createMinute;
  }
}

export default MinutesRepository;
