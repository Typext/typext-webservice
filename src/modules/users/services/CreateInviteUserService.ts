import path from 'path';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import ICreateInviteUserDTO from '../dtos/ICreateInviteUserDTO';
import User from '../infra/typeorm/entities/User';
import IInviteUsersRepository from '../repositories/IInviteUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
class CreateInviteUserService {
  constructor(
    @inject('InviteUsersRepository')
    private inviteUsersRepository: IInviteUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    name,
    email,
    type,
  }: ICreateInviteUserDTO): Promise<User> {
    const user = await this.inviteUsersRepository.findByEmail(email);

    if (user) {
      throw new AppError('This email is already in use.', 401);
    }

    const userType =
      type !== 'Admin' && type !== 'Gerente' && type !== 'Usuário';

    if (userType) {
      throw new AppError('That user type does not exist.', 401);
    }

    const inviteUser = this.inviteUsersRepository.create({
      name,
      email,
      type,
    });

    const { token } = await this.userTokensRepository.generate(
      (await inviteUser).id,
    );

    const inviteUserTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'invite_user.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: (await inviteUser).name,
        email: (await inviteUser).email,
      },
      subject: '[Typext] Convite para Cadastro',
      templateData: {
        file: inviteUserTemplate,
        variables: {
          name: (await inviteUser).name,
          link: `${process.env.APP_WEB_URL}/invite-user/${token}`,
        },
      },
    });

    return inviteUser;
  }
}

export default CreateInviteUserService;
