import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SchedulesController from '../controllers/SchedulesController';

const scheduleRouter = Router();

const schedulesController = new SchedulesController();

scheduleRouter.use(ensureAuthenticated);

scheduleRouter.post('/', schedulesController.create);

export default scheduleRouter;
