import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ReviewsController from '../controllers/ReviewsController';

const reviewRouter = Router();

const reviewsController = new ReviewsController();

reviewRouter.use(ensureAuthenticated);

reviewRouter.post('/', reviewsController.create);

export default reviewRouter;
