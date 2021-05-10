import Minute from '../infra/typeorm/entities/Minute';

export default interface ICreateMinuteDTO {
  minute_id: number;
  name: string;
  responsible: string;
  deadline: Date;
}
