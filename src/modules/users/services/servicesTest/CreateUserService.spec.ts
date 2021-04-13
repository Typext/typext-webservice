import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let InviteUser: CreateInviteUserService;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    InviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    await InviteUser.execute({
      name: 'John',
      email: 'johndoe@email.com',
      type: 'Usuário',
    });

    const register = {
      email: 'johndoe@email.com',
      name: 'Evandro Rodrigues',
      password: '123456',
      office: 'Mr',
      area: 'TI',
      company: 'typext',
      phone: '12 99999999',
    };

    const user = await createUser.execute(register);

    expect(user.active).toBe(true);
  });

  it('should not be able to create without an ivitation', async () => {
    const register = {
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '123456',
      office: 'Mr',
      area: 'TI',
      company: 'typext',
      phone: '12 99999999',
    };

    await expect(createUser.execute(register)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user if invitation were more than 2 hours', async () => {
    await InviteUser.execute({
      name: 'John',
      email: 'johndoe@email.com',
      type: 'Usuário',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    // const user = {
    //   email: 'johndoe@email.com',
    //   name: 'Evandro Rodrigues',
    //   password: '123456',
    //   office: 'Mr',
    //   area: 'TI',
    //   company: 'typext',
    //   phone: '12 99999999',
    // };

    await expect(
      createUser.execute({
        email: 'johndoe@email.com',
        name: 'Evandro Rodrigues',
        password: '123456',
        office: 'Mr',
        area: 'TI',
        company: 'typext',
        phone: '12 99999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
