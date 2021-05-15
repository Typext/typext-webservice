import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ReviewsController from '../controllers/ReviewsController';

const reviewRouter = Router();

const reviewsController = new ReviewsController();

reviewRouter.use(ensureAuthenticated);

reviewRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      minute_id: Joi.string().required(),
      topic: Joi.string().required(),
      responsible: Joi.string().required(),
      deadline: Joi.date().required(),
    },
  }),
  reviewsController.create,
);

export default reviewRouter;
