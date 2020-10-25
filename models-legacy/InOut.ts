import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Transaction from './Transaction';
import Item from './Item';

@Entity('in_out')
class InOut {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transaction_id: string;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  member: Transaction;

  @Column()
  item_id: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default InOut;
