export default interface ICreateRevisionDTO {
  user_id?: string;
  minute_id: number;
  topic: string;
  responsible: string;
  deadline: Date;
  created_at: Date;
  updated_at: Date;
}
