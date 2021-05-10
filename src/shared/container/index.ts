import './providers';
import '@modules/users/providers';

import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import MinutesRepository from '@modules/minutes/infra/typeorm/repositories/MinutesRepository';
import IMinutesRepository from '@modules/minutes/repositories/IMinutesRepository';

import LogsRepository from '@modules/minutes/infra/typeorm/repositories/LogsRepository';
import ILogsRepository from '@modules/minutes/repositories/ILogsRepository';

import ParticipantsRepository from '@modules/minutes/infra/typeorm/repositories/ParticipantsRepository';
import IParticipantsRepository from '@modules/minutes/repositories/IParticipantsRepository';

import TopicsRepository from '@modules/minutes/infra/typeorm/repositories/TopicsRepository';
import ITopicsRepository from '@modules/minutes/repositories/ITopicsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMinutesRepository>(
  'MinutesRepository',
  MinutesRepository,
);

container.registerSingleton<ILogsRepository>('LogsRepository', LogsRepository);

container.registerSingleton<IParticipantsRepository>(
  'ParticipantsRepository',
  ParticipantsRepository,
);

container.registerSingleton<ITopicsRepository>(
  'TopicsRepository',
  TopicsRepository,
);
