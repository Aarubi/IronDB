import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Entries from './Entries';

@Entity('item')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entries_id: string;

  @ManyToOne(() => Entries)
  @JoinColumn({ name: 'entries_id' })
  entries: Entries;

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

export default Item;
