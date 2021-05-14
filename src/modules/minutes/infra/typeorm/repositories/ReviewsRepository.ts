import IReviewRepository from '@modules/minutes/repositories/IReviewRepository';

import { getRepository, Repository } from 'typeorm';

import ICreateReviewDTO from '@modules/minutes/dtos/ICreateReviewDTO';
import Review from '../entities/MinuteReview';

class ReviewsRepository implements IReviewRepository {
  private ormRepository: Repository<Review>;
  constructor() {
    this.ormRepository = getRepository(Review);
  }

  public async create(request: ICreateReviewDTO): Promise<Review | undefined> {
    const createdReview = this.ormRepository.create(request);

    await this.ormRepository.save(createdReview);

    return createdReview;
  }
}

export default ReviewsRepository;
