import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import CreateInviteUserService from '../CreateInviteUserService';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let createInviteUser: CreateInviteUserService;

describe('InviteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();

    createInviteUser = new CreateInviteUserService(
      fakeUserRepository,
      fakeMailProvider,
    );
  });

  it('should be able to invite a new user', async () => {
    const user = await createInviteUser.execute({
      userType: 'Admin',
      name: 'John Doe',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be possible for a user who is not an administrator to invite an user', async () => {
    await expect(
      createInviteUser.execute({
        userType: 'non-admin user',
        name: 'John',
        email: 'johndoe@example.com',
        type: 'Usuário',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to invite a new user a registered email', async () => {
    await createInviteUser.execute({
      userType: 'Admin',
      name: 'John Doe',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    await expect(
      createInviteUser.execute({
        userType: 'Admin',
        name: 'John Doe',
        email: 'johndoe@example.com',
        type: 'Usuário',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to invite a new user with a wrong type', async () => {
    await expect(
      createInviteUser.execute({
        userType: 'Admin',
        name: 'John Doe',
        email: 'johndoe@example.com',
        type: 'Vendedor',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
