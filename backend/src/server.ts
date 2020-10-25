import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
// import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

// app.use('/files', express.static(uploadConfig.directory));
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
app.listen(3030, () => {
  console.log('TÁ RODANDO CARALHO! (port:3030)');
});
