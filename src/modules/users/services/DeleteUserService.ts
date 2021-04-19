import IDeleteUserDTO from '@modules/users/dtos/IDeleteUserDTO';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    deletedUserId,
    userType,
  }: IDeleteUserDTO): Promise<void> {
    if (userType !== 'Admin') {
      throw new AppError('Permission denied', 401);
    }

    const foundUser = await this.usersRepository.findById(deletedUserId);

    if (!foundUser) {
      throw new AppError(
        'The userId selected was not found or is invalid',
        404,
      );
    }

    const adminsUsersCont = await this.usersRepository.countByType(userType);
    if (adminsUsersCont <= 1 && foundUser.type === 'Admin') {
      throw new AppError(
        'Permission denied: you cannot remove the last admin from the system',
        403,
      );
    }

    await this.usersRepository.delete(foundUser);
  }
}
