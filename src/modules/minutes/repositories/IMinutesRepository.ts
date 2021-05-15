import ICreateMinuteDTO from '../dtos/ICreateMinuteDTO';
import Minute from '../infra/typeorm/entities/Minute';

export default interface IMinutesRepository {
  create(minute: ICreateMinuteDTO): Promise<Minute>;
  show(minuteId: number): Promise<Minute | undefined>;
  findAll(): Promise<Minute[]>;
}
