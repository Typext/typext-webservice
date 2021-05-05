import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import File from './File';

@Entity('minutes')
class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  // @ManyToOne(() => File)
  @JoinColumn()
  file_id: File;

  @Column()
  start_date: Date;

  @Column()
  minute_number: string;

  @Column()
  place: string;

  @Column()
  project: string;

  @Column('text', { array: true })
  schedules: string[];

  @Column('text', { array: true })
  areas: string[];

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Minute;
