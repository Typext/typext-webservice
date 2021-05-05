import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import MinutesController from '../controllers/MinutesController';

const minuteRouter = Router();

const minutesController = new MinutesController();

minuteRouter.use(ensureAuthenticated);

minuteRouter.post('/', minutesController.create);

export default minuteRouter;
