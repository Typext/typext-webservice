import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import UpdateInviteUserTokenService from '../UpdateInviteUserTokenService';
import CreateInviteUserService from '../CreateInviteUserService';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let inviteUser: CreateInviteUserService;
let updateInviteUserToken: UpdateInviteUserTokenService;

describe('UpdateInviteUserToken', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();

    inviteUser = new CreateInviteUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    updateInviteUserToken = new UpdateInviteUserTokenService(
      fakeUsersRepository,
      fakeMailProvider,
    );
  });

  it('should be able to update invite user token using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await inviteUser.execute({
      userType: 'Admin',
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

    await updateInviteUserToken.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateInviteUserToken.execute('non-existing user'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
