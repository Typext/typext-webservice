import Participant from '../infra/typeorm/entities/Participant';
import ICreateParticipantDTO from '../dtos/ICreateParticipantDTO';

export default interface ILogsRepository {
  create(participant: ICreateParticipantDTO): Promise<Participant>;
}
