import path from 'path';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import IInviteUsersRepository from '../repositories/IInviteUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
}

@injectable()
class UpdateInviteUserTokenService {
  constructor(
    @inject('InviteUsersRepository')
    private inviteUsersRepository: IInviteUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.', 404);
    }

    const user = await this.inviteUsersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    userToken.updated_at = new Date();

    await this.userTokensRepository.update(userToken);

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
          link: `${process.env.APP_WEB_URL}/invite-user/${token}`,
        },
      },
    });

    await this.inviteUsersRepository.save(user);
  }
}

export default UpdateInviteUserTokenService;
