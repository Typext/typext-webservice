import User from '@modules/users/infra/typeorm/entities/User';
// import File from '../infra/typeorm/entities/File';

export default interface ICreateMinuteDTO {
  start_date: Date;
  minute_number: string;
  place: string;
  project: string;
  schedules: string[];
  areas: string[];
  status: string;
  user_id: User;
  // file_id?: File;
}