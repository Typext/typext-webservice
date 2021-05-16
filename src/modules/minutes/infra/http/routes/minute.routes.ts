import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import MinutesController from '../controllers/MinutesController';

const minuteRouter = Router();

const minutesController = new MinutesController();

minuteRouter.use(ensureAuthenticated);

minuteRouter.get('/:id', minutesController.show);
minuteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      minute: {
        start_date: Joi.date().required(),
        place: Joi.string().required(),
        project: Joi.string().required(),
        schedules: Joi.array().required(),
        areas: Joi.array().required(),
      },
      participant: Joi.array().items({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        title: Joi.string().max(3).required(),
        company: Joi.string().required(),
        phone: Joi.string().required(),
        digital_signature: Joi.bool().required(),
      }),
      topic: Joi.array().items({
        name: Joi.string().min(2).required(),
        responsible: Joi.string().required(),
        deadline: Joi.date().required(),
      }),
    },
  }),
  minutesController.create,
);
minuteRouter.get('/', minutesController.index);

export default minuteRouter;
