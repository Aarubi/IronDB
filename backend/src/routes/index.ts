import { Router } from 'express';
import entriesRouter from './entries.routes';
import itemsRouter from './items.routes';
import membersRouter from './members.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/members', membersRouter);
routes.use('/entries', entriesRouter);
// routes.use('/sessions', );

export default routes;
