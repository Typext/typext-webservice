import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import UpdateUserTypeService from '../UpdateUserTypeService';
import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;
let updateUserType: UpdateUserTypeService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    updateUserType = new UpdateUserTypeService(fakeUsersRepository);
  });

  it("should be able for the administrator user to update the user's permission level", async () => {
    await inviteUser.execute({
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const user = await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      office: 'DEV',
      area: 'TI',
      company: 'Typext',
      phone: '(12)99999-9999',
    });

    const updatedUser = await updateUserType.execute({
      userId: user.id,
      userType: 'Admin',
      type: 'Gerente',
    });

    expect(updatedUser.type).toBe('Gerente');
  });

  it('should not be able to update the permission level from non-existing user', async () => {
    await expect(
      updateUserType.execute({
        userId: 'non-existing-user-id',
        userType: 'Admin',
        type: 'Gerente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("it should not be possible for a user who is not an administrator to update the user's permission level", async () => {
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
      updateUserType.execute({
        userId: user.id,
        userType: 'Gerente',
        type: 'Gerente',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to update the password without old password', async () => {
  //   await inviteUser.execute({
  //     name: 'John',
  //     email: 'johndoe@example.com',
  //     type: 'Usuário',
  //   });

  //   const user = await createUser.execute({
  //     email: 'johndoe@example.com',
  //     name: 'John Tre',
  //     password: '123456',
  //     office: 'PO',
  //     area: 'TI',
  //     company: 'Your Company',
  //     phone: '(11)98888-8888',
  //   });

  //   await expect(
  //     updateUserType.execute({
  //       userId: user.id,
  //       name: 'John Tre',
  //       password: '123123',
  //       office: 'PO',
  //       area: 'TI',
  //       company: 'Your Company',
  //       phone: '(11)98888-8888',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  // it('should not be able to update the password with wrong old password', async () => {
  //   await inviteUser.execute({
  //     name: 'John',
  //     email: 'johndoe@example.com',
  //     type: 'Usuário',
  //   });

  //   const user = await createUser.execute({
  //     email: 'johndoe@example.com',
  //     name: 'John Tre',
  //     password: '123456',
  //     office: 'PO',
  //     area: 'TI',
  //     company: 'Your Company',
  //     phone: '(11)98888-8888',
  //   });

  //   await expect(
  //     updateUserType.execute({
  //       userId: user.id,
  //       name: 'John Tre',
  //       old_password: 'wrong-old-password',
  //       password: '123123',
  //       office: 'PO',
  //       area: 'TI',
  //       company: 'Your Company',
  //       phone: '(11)98888-8888',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
