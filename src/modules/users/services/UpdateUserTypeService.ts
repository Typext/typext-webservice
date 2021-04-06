import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  userType: string;
  type: string;
}

@injectable()
class UpdateUserTypeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, userType, type }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (userType !== 'Admin') {
      throw new AppError(
        'This user type does not have access to this resource.',
        401,
      );
    }

    user.type = type;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserTypeService;
