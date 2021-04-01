import ICreateInviteUserDTO from '../dtos/ICreateInviteUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface ICompaniesRepository {
  create({ name, email, type }: ICreateInviteUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
