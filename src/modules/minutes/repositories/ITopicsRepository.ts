import Topic from '../infra/typeorm/entities/Topic';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';

export default interface ICreateTopicRepository {
  create(topic: ICreateTopicDTO): Promise<Topic>;
  index(minuteId: number): Promise<Topic[]>;
  destroyAll(request: ICreateTopicDTO): Promise<Topic[]>;
}
