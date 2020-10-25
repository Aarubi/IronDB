/* eslint-disable camelcase */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EntriesRepository from '../repositories/EntriesRepository';
import AddEntriesService from '../services/AddEntriesService';
import AddItemByEntries from '../services/AddItemByEntriesService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const entriesRouter = Router();

// itemsRouter.use(ensureAuthenticated);

entriesRouter.get('/', async (request, response) => {
  const entriesRepository = getCustomRepository(EntriesRepository);
  const entries = await entriesRepository.find();

  return response.json(entries);
});

entriesRouter.post('/', async (request, response) => {
  const { entries_date, price, nota_fiscal } = request.body;

  const addEntry = new AddEntriesService();

  const entry = await addEntry.execute({
    entries_date,
    price,
    nota_fiscal,
  });

  return response.json(entry);
});

entriesRouter.post('/items', async (request, response) => {
  const { entries_date, price, nota_fiscal, items } = request.body;

  const addEntryItems = new AddItemByEntries();

  const entryItems = await addEntryItems.execute({
    entries_date,
    price,
    nota_fiscal,
    items,
  });

  return response.json(entryItems);
});

export default entriesRouter;
