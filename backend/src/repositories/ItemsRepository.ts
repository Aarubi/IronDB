import { EntityRepository, Repository } from 'typeorm';

import Item from '../models/Item';

@EntityRepository(Item)
class ItemsRepository extends Repository<Item> {
  public async findByName(name: string): Promise<Item | null> {
    const findItem = await this.findOne({
      where: { name },
    });
    return findItem || null;
  }
}

export default ItemsRepository;
