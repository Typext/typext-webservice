import path from 'path';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateInviteUserTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    user.updated_at = new Date();

    const inviteUserTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'invite_user.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.email,
        email: user.email,
      },
      subject: '[Typext] Novo link de convite',
      templateData: {
        file: inviteUserTemplate,
        variables: {
          name: user.email,
          link: `${process.env.APP_WEB_URL}/invite-user/${email}`,
        },
      },
    });

    await this.usersRepository.save(user);
  }
}

export default UpdateInviteUserTokenService;
