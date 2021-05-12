import { inject, injectable } from 'tsyringe';

import Minute from '../infra/typeorm/entities/Minute';
import IMinutesRepository from '../repositories/IMinutesRepository';

@injectable()
class ListMinuteService {
  constructor(
    @inject('MinutesRepository')
    private minutesRepository: IMinutesRepository,
  ) {}

  public async execute(): Promise<Minute[]> {
    const minutes = await this.minutesRepository.findAll();

    return minutes;
  }
}

export default ListMinuteService;
