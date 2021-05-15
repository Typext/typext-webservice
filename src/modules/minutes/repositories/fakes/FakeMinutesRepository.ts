import { uuid } from 'uuidv4';

import Minute from '@modules/minutes/infra/typeorm/entities/Minute';
import ICreateMinuteDTO from '@modules/minutes/dtos/ICreateMinuteDTO';
import IMinutesRepository from '../IMinutesRepository';

class FakeMinutesRepository implements IMinutesRepository {
  private minutes: Minute[] = [];

  public async findById(minuteId: number): Promise<Minute | undefined> {
    const findMinute = this.minutes.find(minute => minute.id === minuteId);

    return findMinute;
  }

  public async findAll(): Promise<Minute[]> {
    return this.minutes;
  }

  public async create({
    user_id,
    minute_number,
    start_date,
    end_date,
    place,
    project,
    areas,
    schedules,
    status,
  }: ICreateMinuteDTO): Promise<Minute> {
    const createMinute = new Minute();

    Object.assign(createMinute, {
      id: uuid(),
      user_id,
      minute_number,
      start_date,
      end_date,
      place,
      project,
      areas,
      schedules,
      status,
    });

    this.minutes.push(createMinute);

    return createMinute;
  }

  async deleteScheduleMeeting(minute: Minute): Promise<void> {
    const findIndex = this.minutes.findIndex(
      deleteScheduleMeeting => deleteScheduleMeeting.id === minute.id,
    );

    this.minutes.splice(findIndex, 1);
  }
}

export default FakeMinutesRepository;
