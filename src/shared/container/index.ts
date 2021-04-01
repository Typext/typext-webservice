import InviteUsersRepository from '@modules/users/infra/typeorm/repositories/InviteUsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IInviteUsersRepository from '@modules/users/repositories/IInviteUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IInviteUsersRepository>(
  'InviteUsersRepository',
  InviteUsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
