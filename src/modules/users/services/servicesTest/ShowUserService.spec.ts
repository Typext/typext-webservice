import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import ShowUserService from '../ShowUserService';
import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to find one user by id', async () => {
    await inviteUser.execute({
      userType: 'Admin',
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      office: 'Mr',
      area: 'TI',
      company: 'Typext',
      phone: '(12)99999-9999',
    });

    const userId = user.id;

    await showUser.execute({ userId });

    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('123456');
  });

  it('should not find a non-existing user', async () => {
    const userId = 'user-id';

    showUser.execute({ userId });

    await expect(
      showUser.execute({
        userId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
