import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokensRepository from '../../repositories/fakes/FakeUserTokensRepository';

import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;

let inviteUser: CreateInviteUserService;
let createUser: CreateUserService;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await inviteUser.execute({
      name: 'John',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    await createUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      office: 'DEV',
      area: 'TI',
      company: 'Typext',
      phone: '(12)99999-9999',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

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

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
