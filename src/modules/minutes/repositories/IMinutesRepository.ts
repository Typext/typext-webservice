import ICreateMinuteDTO from '../dtos/ICreateMinuteDTO';
import IGetMinuteDTO from '../dtos/IGetMinuteDTO';
import Minute from '../infra/typeorm/entities/Minute';

export default interface IMinutesRepository {
  create(minute: ICreateMinuteDTO): Promise<Minute>;
  show(request: IGetMinuteDTO): Promise<Minute | undefined>;
}
