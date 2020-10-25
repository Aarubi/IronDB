// Por enquanto ainda só da pra adicionar itens individualmente
// (Futuramente , vários por meio de entries e por upload de arquivos .csv)

import { getCustomRepository } from 'typeorm';

import Item from '../models/Item';
import ItemsRepository from '../repositories/ItemsRepository';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  brand: string;
  type: string;
  quantity: number;
  description: string;
}

export default class AddItemService {
  public async execute({
    name,
    brand,
    type,
    quantity,
    description,
  }: Request): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemsRepository);

    const findSameItem = await itemsRepository.findByName(name);
    if (findSameItem) {
      throw new AppError(
        'Item already exists in database. Try updating only its quantity.',
        206
      );
    }

    const item = itemsRepository.create({
      name,
      brand,
      type,
      quantity,
      description,
    });
    await itemsRepository.save(item);
    return item;
  }
}
