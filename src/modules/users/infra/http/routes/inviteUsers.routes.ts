import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import InviteUsersController from '../controllers/InviteUsersController';

const inviteUsersRouter = Router();

const inviteUsersController = new InviteUsersController();

inviteUsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      type: Joi.string().required(),
    },
  }),
  inviteUsersController.create,
);

inviteUsersRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
    },
  }),
  inviteUsersController.update,
);

export default inviteUsersRouter;
