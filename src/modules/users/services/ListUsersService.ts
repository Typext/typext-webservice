import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userType: string): Promise<User[]> {
    if (userType !== 'Admin') {
      throw new AppError(
        'This user type does not have access to this resource',
        403,
      );
    }

    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUsersService;
