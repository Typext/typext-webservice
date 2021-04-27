import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import File from './File';

@Entity('minutes')
class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user' })
  user_id: User;

  @OneToOne(() => File)
  @JoinColumn({ name: 'file' })
  minute_review_id: File;

  @Column()
  start_date: Date;

  @Column()
  minute_number: string;

  @Column()
  place: string;

  @Column()
  project: string;

  @Column()
  schedules: string;

  @Column()
  areas: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Minute;
