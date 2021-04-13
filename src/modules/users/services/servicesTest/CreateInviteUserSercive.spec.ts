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

  it('Should be able to invite a new user', async () => {
    const user = await createInviteUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      type: 'Usuário',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to invite a new user a registered email', async () => {
    await createInviteUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      type: 'Usuário',
    });

    await expect(
      createInviteUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        type: 'Usuário',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to invite a new user with a wrong type', async () => {
    await expect(
      createInviteUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        type: 'Vendedor',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
