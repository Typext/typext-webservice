import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRpository from '@modules/users/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRpository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async create(user: User): Promise<User> {
    const createUser = new User();

    createUser.active = true;

    return createUser;
  }
}

export default FakeUsersRepository;
