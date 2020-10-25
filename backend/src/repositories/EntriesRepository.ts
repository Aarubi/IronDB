/* eslint-disable camelcase */
import { EntityRepository, Repository } from 'typeorm';

import Entries from '../models/Entries';

@EntityRepository(Entries)
class EntriesRepository extends Repository<Entries> {
  public async findByFiscal(nota_fiscal: string): Promise<Entries | null> {
    const findEntries = await this.findOne({
      where: { nota_fiscal },
    });
    return findEntries || null;
  }
}

export default EntriesRepository;
