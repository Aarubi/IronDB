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
  id_entries: string;

  @CreateDateColumn()
  entries_date: Date;

  @Column()
  price: number;

  @Column()
  nota_fiscal: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Entries;
