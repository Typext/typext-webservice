import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import LogsController from '../controllers/LogsController';

const logsRouter = Router();

const logsController = new LogsController();

logsRouter.use(ensureAuthenticated);

logsRouter.get('/', logsController.index);
export default logsRouter;
