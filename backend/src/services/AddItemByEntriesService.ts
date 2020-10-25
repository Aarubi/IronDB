/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import Entries from '../models/Entries';
import EntriesRepository from '../repositories/EntriesRepository';
import Item from '../models/Item';
import ItemsRepository from '../repositories/ItemsRepository';
import AppError from '../errors/AppError';

interface Request {
  entries_date: string;
  price: number;
  nota_fiscal: string;
  items: [
    {
      name: string;
      brand: string;
      type: string;
      quantity: number;
      description: string;
    }
  ];
}

export default class AddItemByEntries {
  public async execute({
    entries_date,
    price,
    nota_fiscal,
  }: Request): Promise<Entries & Item> {
    const entriesRepository = getCustomRepository(EntriesRepository);
    const itemsRepository = getCustomRepository(ItemsRepository);

    const findSameEntry = await entriesRepository.findByFiscal(nota_fiscal);
    if (findSameEntry) {
      throw new AppError('Entry already exists in the database', 400);
    }

    const entry = entriesRepository.create({
      entries_date,
      price,
      nota_fiscal,
    });

    entriesRepository.save(entry);

    const entriesItem = itemsRepository.create([
      {
        name: Item.name,
        brand: Item.brand,
        type: Item.type,
        quantity: Item.quantity,
        description: Item.description,
      }
    ]);

    return [entry, entriesItem];
  }
}
