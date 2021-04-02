import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    token,
    name,
    password,
    office,
    area,
    company,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.', 404);
    }

    const tokenUpdatedAt = userToken.updated_at;

    const compareDate = addHours(tokenUpdatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    user.active = true;

    const hashedPassword = await this.hashProvider.generateHash(password);

    Object.assign(user, {
      name,
      password: hashedPassword,
      office,
      area,
      company,
      phone,
      active: true,
    });

    await this.usersRepository.create(user);

    return user;
  }
}

export default CreateUserService;
