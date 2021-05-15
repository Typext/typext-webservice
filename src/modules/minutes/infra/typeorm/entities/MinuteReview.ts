import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import Minute from './Minute';

@Entity('minute_reviews')
class MinuteReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Minute)
  @JoinColumn({ name: 'minute_id' })
  minute_id: Minute;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column()
  topic: string;

  @Column()
  responsible: string;

  @Column()
  deadline: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MinuteReview;
