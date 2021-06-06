/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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

  public async destroyAll(
    request: ICreateTopicDTO,
  ): Promise<Topic[] | undefined> {
    const foundTopics = await this.ormRepository.find({
      where: { minute_id: request.minute_id },
    });

    for (const topic of foundTopics) {
      this.ormRepository.delete(topic.id);
    }
    return foundTopics;
  }

  public async index(minuteId: number): Promise<Topic[]> {
    const foundTopics = await this.ormRepository.find({
      where: { minute_id: minuteId },
    });
    return foundTopics;
  }
}

export default TopicisRepository;
