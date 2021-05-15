import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import MinuteReview from './MinuteReview';
import Minute from './Minute';

@Entity('logs')
class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToOne(() => MinuteReview)
  @JoinColumn({ name: 'minute_review_id' })
  minute_review_id: MinuteReview;

  @ManyToOne(() => Minute)
  @JoinColumn({ name: 'minute_id' })
  minute_id: Minute;

  @Column()
  registered_action: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Log;
