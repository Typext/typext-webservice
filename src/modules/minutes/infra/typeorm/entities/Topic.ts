import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Minute from './Minute';

@Entity('topics')
class Topicis {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Minute)
  @JoinColumn({ name: 'minute_id' })
  minute_id: Minute;

  @Column()
  name: string;

  @Column()
  responsible: string;

  @Column()
  deadline: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Topicis;
