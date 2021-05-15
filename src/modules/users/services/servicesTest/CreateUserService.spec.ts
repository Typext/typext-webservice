import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    await inviteUser.execute({
      userType: 'Admin',
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const register = {
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      office: 'Mr',
      area: 'TI',
      company: 'Typext',
      phone: '(12)99999-9999',
    };

    const user = await createUser.execute(register);

    expect(user.active).toBe(true);
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create without an invitation', async () => {
    const register = {
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      office: 'Mr',
      area: 'TI',
      company: 'Typext',
      phone: '(12)99999-9999',
    };

    await expect(createUser.execute(register)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user if invitation were more than 2 hours', async () => {
    await inviteUser.execute({
      userType: 'Admin',
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      createUser.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123456',
        office: 'Mr',
        area: 'TI',
        company: 'Typext',
        phone: '(12)99999-9999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
