import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
    office,
    area,
    company,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    const invitationTime = user.updated_at;

    const compareDate = addHours(invitationTime, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 401);
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

    console.log(user.type);

    await this.usersRepository.register(user);

    return user;
  }
}

export default CreateUserService;
