import path from 'path';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import ICreateInviteUserDTO from '../dtos/ICreateInviteUserDTO';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateInviteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    name,
    email,
    type,
  }: ICreateInviteUserDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('This email is already in use.', 401);
    }

    const userType =
      type !== 'Admin' && type !== 'Gerente' && type !== 'Usuário';

    if (userType) {
      throw new AppError('That user type does not exist.', 403);
    }

    const inviteUser = await this.usersRepository.create({ name, email, type });

    const inviteUserTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'invite_user.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: inviteUser.name,
        email: inviteUser.email,
      },
      subject: '[Typext] Convite para Cadastro',
      templateData: {
        file: inviteUserTemplate,
        variables: {
          name: inviteUser.name,
          link: `${process.env.APP_WEB_URL}/invite/${email}`,
        },
      },
    });

    return inviteUser;
  }
}

export default CreateInviteUserService;
