import Log from '../infra/typeorm/entities/Log';
import ICreateLogDTO from '../dtos/ICreateLogDTO';

export default interface ILogsRepository {
  create(log: ICreateLogDTO): Promise<Log>;
  findAll(): Promise<Log[]>;
  findByMinute(id: number): Promise<Log[]>;
}
