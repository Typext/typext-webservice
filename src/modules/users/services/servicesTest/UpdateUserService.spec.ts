import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import UpdateUserService from '../UpdateUserService';
import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;
let updateUser: UpdateUserService;

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

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
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

    const updatedUser = await updateUser.execute({
      userId: user.id,
      name: 'John Tre',
      office: 'PO',
      area: 'TI',
      company: 'Your Company',
      phone: '(11)98888-8888',
    });

    expect(updatedUser.office).toBe('PO');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateUser.execute({
        userId: 'non-existing-user-id',
        name: 'John Tre',
        office: 'PO',
        area: 'TI',
        company: 'Your Company',
        phone: '(11)98888-8888',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
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

    console.log(user);

    const updatedUser = await updateUser.execute({
      userId: user.id,
      name: 'John Tre',
      old_password: '123456',
      password: '123123',
      office: 'PO',
      area: 'TI',
      company: 'Your Company',
      phone: '(11)98888-8888',
    });

    console.log(updatedUser);

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
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
      updateUser.execute({
        userId: user.id,
        name: 'John Tre',
        password: '123123',
        office: 'PO',
        area: 'TI',
        company: 'Your Company',
        phone: '(11)98888-8888',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
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
      updateUser.execute({
        userId: user.id,
        name: 'John Tre',
        old_password: 'wrong-old-password',
        password: '123123',
        office: 'PO',
        area: 'TI',
        company: 'Your Company',
        phone: '(11)98888-8888',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
