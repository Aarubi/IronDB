import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Member from './Member';
import Provider from './Provider';

@Entity('entries')
class Entries {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  members_id: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'members_id' })
  member: Member;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Entries;
