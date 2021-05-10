import Topic from '../infra/typeorm/entities/Topic';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ILogsRepository {
  create(topic: ICreateTopicDTO): Promise<Topic>;
}
