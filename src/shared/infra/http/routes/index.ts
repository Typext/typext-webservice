import { Router } from 'express';

import inviteUsersRouter from '@modules/users/infra/http/routes/inviteUsers.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import minuteRouter from '@modules/minutes/infra/http/routes/minute.routes';
import reviewsRouter from '@modules/minutes/infra/http/routes/review.routes';

const routes = Router();

routes.use('/invite-users', inviteUsersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/minutes', minuteRouter);
routes.use('/reviews', reviewsRouter);

export default routes;
