import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRpository from '@modules/users/repositories/IUsersRepository';
import ICreateInviteUserDTO from '@modules/users/dtos/ICreateInviteUserDTO';

class FakeUsersRepository implements IUsersRpository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findAll(): Promise<User[]> {
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

  async register(user: User): Promise<User> {
    const createUser = new User();

    Object.assign(createUser, { user });

    this.users.push(createUser);

    return createUser;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  async delete(user: User): Promise<User> {
    return user;
  }

  async countByType(type: string): Promise<number> {
    return 1;
  }
}

export default FakeUsersRepository;
