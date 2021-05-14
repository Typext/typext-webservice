export default interface ICreateRevisionDTO {
  minute_id: number;
  topic: string;
  responsible: string;
  deadline: Date;
  created_at: Date;
  updated_at: Date;
}
