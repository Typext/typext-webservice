import User from '@modules/users/infra/typeorm/entities/User';
// import MinuteReview from '../infra/typeorm/entities/MinuteReview';
// import Minute from '../infra/typeorm/entities/Minute';

export default interface ICreateMinuteDTO {
  user_id: User;
  // minute_review_id: MinuteReview;
  minute_id: number;
  registered_action: string;
}
