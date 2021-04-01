import ICreateInviteUserDTO from '@modules/users/dtos/ICreateInviteUserDTO';
import IInviteUsersRepository from '@modules/users/repositories/IInviteUsersRepository';
import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';

class InviteUsersRepository implements IInviteUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    type,
  }: ICreateInviteUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      type,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export default InviteUsersRepository;
