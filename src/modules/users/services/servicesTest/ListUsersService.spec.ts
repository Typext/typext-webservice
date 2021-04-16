import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import ListUsersService from '../ListUsersService';
import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able for the administrator user to list all users', async () => {
    const user1 = await inviteUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const user2 = await inviteUser.execute({
      name: 'John Tre',
      email: 'johntre@example.com',
      type: 'Usuário',
    });

    const allUsers = await listUsers.execute('Admin');

    expect(allUsers).toEqual([user1, user2]);
  });

  it('should not be possible for a user who is not an administrator to list all users', async () => {
    await inviteUser.execute({
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Tre',
      password: '123456',
      office: 'PO',
      area: 'TI',
      company: 'Your Company',
      phone: '(11)98888-8888',
    });

    await expect(listUsers.execute('Gerente')).rejects.toBeInstanceOf(AppError);
  });
});
