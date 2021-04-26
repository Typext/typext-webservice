import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Minute from './Minute';

@Entity('minute_reviews')
class MinuteReview {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Minute)
  @JoinColumn({ name: 'minute' })
  user_id: Minute;

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
