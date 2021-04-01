import 'reflect-metadata';


import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

import express from 'express';


import routes from './routes';
import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
