export default interface ICreateMinuteDTO {
  start_date: Date;
  end_date?: Date;
  minute_number: string;
  place: string;
  project: string;
  schedules: string[];
  areas: string[];
  status: string;
  user_id: string;
  // file_id?: File;
}
