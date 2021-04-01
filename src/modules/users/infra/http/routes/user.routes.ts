import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  return res.send('working');
});

export default usersRouter;
