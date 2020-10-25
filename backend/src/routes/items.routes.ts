import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ItemsRepository from '../repositories/ItemsRepository';
import AddItemService from '../services/AddItemService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const itemsRouter = Router();

// itemsRouter.use(ensureAuthenticated);

itemsRouter.get('/', async (request, response) => {
  const itemsRepository = getCustomRepository(ItemsRepository);
  const items = await itemsRepository.find();

  return response.json(items);
});

itemsRouter.post('/', async (request, response) => {
  const { name, brand, type, quantity, description } = request.body;

  const addItem = new AddItemService();

  const item = await addItem.execute({
    name,
    brand,
    type,
    quantity,
    description,
  });

  return response.json(item);
});

export default itemsRouter;
