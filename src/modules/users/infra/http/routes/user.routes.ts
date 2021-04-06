import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlaware/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      office: Joi.string().required(),
      area: Joi.string().required(),
      company: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
  ensureAuthenticated,
);

usersRouter.get('/', ensureAuthenticated, usersController.index);

export default usersRouter;
