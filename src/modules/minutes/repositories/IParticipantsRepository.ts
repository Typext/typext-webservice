import Participant from '../infra/typeorm/entities/Participant';

export default interface ILogsRepository {
  create(participant: Participant): Promise<Participant>;
  index(minuteId: number): Promise<Participant[]>;
  save(participant: Participant): Promise<Participant>;
}
