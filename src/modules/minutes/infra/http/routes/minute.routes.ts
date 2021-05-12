import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import MinutesController from '../controllers/MinutesController';

const minuteRouter = Router();

const minutesController = new MinutesController();

minuteRouter.use(ensureAuthenticated);

minuteRouter.get('/:id', minutesController.show);
minuteRouter.post('/', minutesController.create);
minuteRouter.get('/', minutesController.index);

export default minuteRouter;
