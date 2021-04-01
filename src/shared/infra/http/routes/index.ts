import inviteUsersRouter from '@modules/users/infra/http/routes/inviteUsers.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/invite-users', inviteUsersRouter);

export default routes;
