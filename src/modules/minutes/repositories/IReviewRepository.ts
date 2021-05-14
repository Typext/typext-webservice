import ICreateReviewDTO from '@modules/minutes/dtos/ICreateReviewDTO';
import Review from '../infra/typeorm/entities/MinuteReview';

export default interface IReviewRepository {
  create(request: ICreateReviewDTO): Promise<Review | undefined>;
}
