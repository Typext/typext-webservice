import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMinutesRepository from '../repositories/IMinutesRepository';
import ILogsRepository from '../repositories/ILogsRepository';

interface IRequest {
  userId: string;
  minuteId: number;
}

@injectable()
class DeleteScheduleMeetingService {
  constructor(
    @inject('MinutesRepository')
    private minutesRepository: IMinutesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute({ userId, minuteId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not found.', 404);
    }

    const minute = await this.minutesRepository.findById(minuteId);

    if (!minute) {
      throw new AppError('This minute does not exists.', 401);
    }

    if (minute.status !== 'agendado') {
      throw new AppError(
        'These minutes cannot be deleted in this status.',
        403,
      );
    }

    await this.logsRepository.create({
      minute_id: minute.id,
      user_id: user,
      registered_action: `O agendamento para a reunião ${minute.project} foi excluído por ${minute.user_id}.`,
    });

    await this.minutesRepository.deleteScheduleMeeting(minute);
  }
}

export default DeleteScheduleMeetingService;
