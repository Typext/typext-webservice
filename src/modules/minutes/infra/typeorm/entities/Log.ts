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

import User from '../../../../users/infra/typeorm/entities/User';
import MinuteReview from './MinuteReview';
import Minute from './Minute';

@Entity('logs')
class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user' })
  user_id: User;

  @OneToOne(() => MinuteReview)
  @JoinColumn({ name: 'reviewer' })
  minute_review_id: MinuteReview;

  @ManyToOne(() => Minute)
  @JoinColumn({ name: 'minute' })
  minute_id: Minute;

  @Column()
  registered_action: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Log;
