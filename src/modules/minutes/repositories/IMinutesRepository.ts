import ICreateMinuteDTO from '../dtos/ICreateMinuteDTO';
import Minute from '../infra/typeorm/entities/Minute';

export default interface IMinutesRepository {
  findById(minuteId: number): Promise<Minute | undefined>;
  findAll(): Promise<Minute[]>;
  create(minute: ICreateMinuteDTO): Promise<Minute>;
  deleteScheduleMeeting(minute: Minute): Promise<void>;
}
