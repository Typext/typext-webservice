import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateInviteUserDTO from '@modules/users/dtos/ICreateInviteUserDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const usersList = await this.ormRepository.find();
    return usersList;
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

  public async register({
    name,
    email,
    password,
    office,
    area,
    phone,
    company,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      office,
      area,
      phone,
      company,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<User> {
    await this.ormRepository.delete(user.id);
    return user;
  }

  public async countByType(type: string): Promise<number> {
    return this.ormRepository.count({ type });
  }
}

export default UsersRepository;
