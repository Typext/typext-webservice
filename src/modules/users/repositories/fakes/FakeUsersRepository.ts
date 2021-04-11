import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRpository from '@modules/users/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRpository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create(user: User): Promise<User> {
    const createUser = new User();

    Object.assign(createUser, { id: uuid(), user });

    this.users.push(createUser);

    return createUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
