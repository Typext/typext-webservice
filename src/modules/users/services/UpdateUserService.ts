import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  name: string;
  old_password?: string;
  password?: string;
  office: string;
  area: string;
  company: string;
  phone: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    old_password,
    password,
    office,
    area,
    company,
    phone,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
        403,
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 403);
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    Object.assign(user, {
      name,
      office,
      area,
      company,
      phone,
    });

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
