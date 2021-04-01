import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

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

export default inviteUsersRouter;