import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/logged', ensureAuthenticated, usersController.show);

usersRouter.get('/', ensureAuthenticated, usersController.index);

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

usersRouter.put(
  '/logged',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: null,
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      password_confirmation: Joi.string().when('password', {
        is: null,
        then: Joi.optional(),
        otherwise: Joi.string().required().valid(Joi.ref('password')),
      }),
      office: Joi.string(),
      area: Joi.string(),
      company: Joi.string(),
      phone: Joi.string(),
    },
  }),
  ensureAuthenticated,
  usersController.update,
);

usersRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  usersController.patch,
);

export default usersRouter;
