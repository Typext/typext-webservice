import './providers';
import '@modules/users/providers';

import { container } from 'tsyringe';

import InviteUsersRepository from '@modules/users/infra/typeorm/repositories/InviteUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IInviteUsersRepository from '@modules/users/repositories/IInviteUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IInviteUsersRepository>(
  'InviteUsersRepository',
  InviteUsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
