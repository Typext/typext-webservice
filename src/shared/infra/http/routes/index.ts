import inviteUsersRouter from '@modules/users/infra/http/routes/inviteUsers.routes';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/invite-users', inviteUsersRouter);

routes.use('/users', usersRouter);

export default routes;
