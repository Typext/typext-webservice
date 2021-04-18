import ICreateInviteUserDTO from '../dtos/ICreateInviteUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  create(user: ICreateInviteUserDTO): Promise<User>;
  register(user: User): Promise<User>;
  save(user: User): Promise<User>;
  delete(user: User): Promise<void>;
  countByType(type: string): Promise<number>;
}
