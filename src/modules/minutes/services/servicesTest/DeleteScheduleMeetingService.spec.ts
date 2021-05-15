import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinutesRepository from '@modules/minutes/repositories/fakes/FakeMinutesRepository';
import FakeLogsRepository from '@modules/minutes/repositories/fakes/FakeLogsRepository';
import DeleteScheduleMeetingService from '../DeleteScheduleMeetingService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMinutesRepository: FakeMinutesRepository;
let fakeLogsRepository: FakeLogsRepository;
let deleteScheduleMeeting: DeleteScheduleMeetingService;

describe('DeleteScheduleMeeting', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMinutesRepository = new FakeMinutesRepository();
    fakeLogsRepository = new FakeLogsRepository();

    deleteScheduleMeeting = new DeleteScheduleMeetingService(
      fakeMinutesRepository,
      fakeUsersRepository,
      fakeLogsRepository,
    );
  });

  it('should be able to delete a schedule meeting', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const minute = await fakeMinutesRepository.create({
      user_id: user.id,
      minute_number: '1',
      start_date: new Date('2021-04-25T12:00:00.987Z'),
      end_date: new Date('2021-04-25T15:00:00.987Z'),
      place: 'Typext',
      areas: ['Desenvolvimento', 'UX'],
      project: 'Aumento das vendas',
      schedules: ['Backend', 'Frontend'],
      status: 'agendado',
    });

    const deletedScheduleMeeting = await deleteScheduleMeeting.execute({
      userId: user.id,
      minuteId: minute.id,
    });

    console.log(deletedScheduleMeeting);

    expect(deletedScheduleMeeting).toEqual(undefined);
  });

  it('should not be able to delete a schedule meeting if user does not exist', async () => {
    const minute = await fakeMinutesRepository.create({
      user_id: 'user_id',
      minute_number: '1',
      start_date: new Date('2021-04-25T12:00:00.987Z'),
      end_date: new Date('2021-04-25T15:00:00.987Z'),
      place: 'Typext',
      areas: ['Desenvolvimento', 'UX'],
      project: 'Aumento das vendas',
      schedules: ['Backend', 'Frontend'],
      status: 'agendado',
    });

    await expect(
      deleteScheduleMeeting.execute({
        userId: 'non-existent user',
        minuteId: minute.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a schedule meeting if minute does not exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    await expect(
      deleteScheduleMeeting.execute({
        userId: user.id,
        minuteId: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a schedule meeting with non-existent status', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      type: 'Usuário',
    });

    const minute = await fakeMinutesRepository.create({
      user_id: 'user_id',
      minute_number: '1',
      start_date: new Date('2021-04-25T12:00:00.987Z'),
      end_date: new Date('2021-04-25T15:00:00.987Z'),
      place: 'Typext',
      areas: ['Desenvolvimento', 'UX'],
      project: 'Aumento das vendas',
      schedules: ['Backend', 'Frontend'],
      status: 'non-existent status',
    });

    await expect(
      deleteScheduleMeeting.execute({
        userId: user.id,
        minuteId: minute.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
