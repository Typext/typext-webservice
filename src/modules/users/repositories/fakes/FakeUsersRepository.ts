import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateInviteUserDTO from '@modules/users/dtos/ICreateInviteUserDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async create({
    name,
    email,
    type,
  }: ICreateInviteUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      type,
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async register({
    name,
    email,
    password,
    office,
    area,
    phone,
    company,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      office,
      area,
      phone,
      company,
    });

    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  async delete(user: User): Promise<void> {
    const contAdminUsers = await this.countByType('Admin');

    if (contAdminUsers <= 1) {
      throw new AppError(
        'Permission denied: you cannot remove the last admin from the system',
        403,
      );
    }

    this.users.splice(this.users.indexOf(user), 1);
  }

  async countByType(type: string): Promise<number> {
    let cont = 0;
    this.users.forEach(userInterator => {
      if (userInterator.type === type) {
        cont += 1;
      }
    });
    return cont;
  }
}

export default FakeUsersRepository;
