import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import SchedulesController from '../controllers/SchedulesController';

const scheduleRouter = Router();

const schedulesController = new SchedulesController();

scheduleRouter.use(ensureAuthenticated);

scheduleRouter.post('/', schedulesController.create);
scheduleRouter.put('/:id', schedulesController.update);

scheduleRouter.delete(
  '/minuteId/:minuteId',
  celebrate({
    [Segments.PARAMS]: {
      minuteId: Joi.number().required(),
    },
  }),
  schedulesController.destroy,
);

export default scheduleRouter;
