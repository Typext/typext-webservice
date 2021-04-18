import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';
import DeleteUserService from '../DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able for the administrator user to delete an user', async () => {
    await inviteUser.execute({
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

    const deletedUser = await deleteUser.execute({
      deletedUserId: user.id,
      userType: 'Admin',
    });

    expect(deletedUser).toEqual(undefined);
  });

  it('should not be able to delete a non-existing user', async () => {
    await expect(
      deleteUser.execute({
        deletedUserId: 'non-existing-user-id',
        userType: 'Admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible for a user who is not an administrator to delete an user', async () => {
    await inviteUser.execute({
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Tre',
      password: '123456',
      office: 'PO',
      area: 'TI',
      company: 'Your Company',
      phone: '(11)98888-8888',
    });

    await expect(
      deleteUser.execute({
        deletedUserId: user.id,
        userType: 'Gerente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a user if he is the last administrator user', async () => {
    await inviteUser.execute({
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Admin',
    });

    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Tre',
      password: '123456',
      office: 'PO',
      area: 'TI',
      company: 'Your Company',
      phone: '(11)98888-8888',
    });

    await expect(
      deleteUser.execute({
        deletedUserId: user.id,
        userType: 'Admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
