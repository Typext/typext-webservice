import Minute from '../infra/typeorm/entities/Minute';
import Topic from '../infra/typeorm/entities/Topic';
import Participant from '../infra/typeorm/entities/Participant';

export default interface ICompleteMinuteResponseDTO {
  minute: Minute;
  topics: Topic[];
  participants: Participant[];
}
