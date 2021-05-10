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

@Entity('participants')
class Participants {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Minute)
  @JoinColumn({ name: 'minute_id' })
  minute_id: Minute;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  phone: string;

  @Column()
  digital_signature: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Participants;
