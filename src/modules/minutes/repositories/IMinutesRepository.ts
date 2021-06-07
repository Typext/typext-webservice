import Minute from '../infra/typeorm/entities/Minute';

export default interface IMinutesRepository {
  findById(minuteId: number): Promise<Minute | undefined>;
  findAll(): Promise<Minute[]>;
  create(minute: Minute): Promise<Minute>;
  deleteScheduleMeeting(minute: Minute): Promise<void>;
  save(minute: Minute): Promise<Minute>;
  endSchedule(minute: Omit<Minute, 'user_id'>): Promise<Minute>;
}
