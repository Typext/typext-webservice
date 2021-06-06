import ISignMinuteDTO from '../dtos/ISignMinuteDTO';
import IUpdateParticipantDTO from '../dtos/IUpdateParticipantDTO';
import Participant from '../infra/typeorm/entities/Participant';

export default interface ILogsRepository {
  create(participant: Participant): Promise<Participant>;
  show(request: ISignMinuteDTO): Promise<Participant | undefined>;
  index(minuteId: number): Promise<Participant[]>;
  save(participant: Participant): Promise<Participant>;
  update(request: IUpdateParticipantDTO): Promise<Participant>;
  countParticipants(minuteId: number): Promise<number>;
  countParticipantsWhoSigned(minuteId: number): Promise<number>;
}
