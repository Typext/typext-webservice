// import ITopicsRepository from '@modules/minutes/repositories/ITopicsRepository';
// import { getRepository, Repository } from 'typeorm';

// import ICreateParticipantDTO from '@modules/minutes/dtos/ICreateParticipantDTO';
// import Topic from '../entities/Topic';

// class TopicisRepository implements ITopicsRepository {
//   private ormRepository: Repository<Topic>;
//   constructor() {
//     this.ormRepository = getRepository(Topic);
//   }

//   public async create(topic: ICreateParticipantDTO): Promise<Topic> {
//     const createTopic = this.ormRepository.create(topic);

//     await this.ormRepository.save(createTopic);

//     return createTopic;
//   }
// }

// export default TopicisRepository;

import ITopicsRepository from '@modules/minutes/repositories/ITopicsRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateTopicDTO from '@modules/minutes/dtos/ICreateTopicDTO';
import Topic from '../entities/Topic';

class TopicisRepository implements ITopicsRepository {
  private ormRepository: Repository<Topic>;
  constructor() {
    this.ormRepository = getRepository(Topic);
  }

  public async create(topic: ICreateTopicDTO): Promise<Topic> {
    const createTopic = this.ormRepository.create(topic);

    await this.ormRepository.save(createTopic);

    return createTopic;
  }
}

export default TopicisRepository;
