/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import Entries from '../models/Entries';
import EntriesRepository from '../repositories/EntriesRepository';
import AppError from '../errors/AppError';

interface Request {
  entries_date: string;
  price: number;
  nota_fiscal: string;
}

export default class AddEntries {
  public async execute({
    entries_date,
    price,
    nota_fiscal,
  }: Request): Promise<Entries> {
    const entriesRepository = getCustomRepository(EntriesRepository);

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
    return entry;
  }
}
