import ICreateInviteUserDTO from '../dtos/ICreateInviteUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IInviteUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create({ name, email, type }: ICreateInviteUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
