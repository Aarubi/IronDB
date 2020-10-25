import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import Entries from './Entries';

@Entity('item')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id_item: string;

  @Column()
  entries_id: string;

  @ManyToMany(() => Entries)
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
  static brand: string | undefined;
}

export default Item;
