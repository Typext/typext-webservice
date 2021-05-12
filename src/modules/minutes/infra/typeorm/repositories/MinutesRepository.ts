import IMinutesRepository from '@modules/minutes/repositories/IMinutesRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateMinuteDTO from '@modules/minutes/dtos/ICreateMinuteDTO';
import IGetMinuteDTO from '@modules/minutes/dtos/IGetMinuteDTO';
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

  public async show(request: IGetMinuteDTO): Promise<Minute | undefined> {
    const { minuteId } = request;

    const foundMinute = await this.ormRepository.findOne({
      where: { id: minuteId },
    });

    return foundMinute;
  }
}

export default MinutesRepository;
