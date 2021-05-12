import Topic from '../infra/typeorm/entities/Topic';
import ICreateTopicDTO from '../dtos/ICreateTopicDTO';
import IListTopicsDTO from '../dtos/IListTopicsDTO';

export default interface ILogsRepository {
  create(topic: ICreateTopicDTO): Promise<Topic>;
  index(request: IListTopicsDTO): Promise<Topic[]>;
}
