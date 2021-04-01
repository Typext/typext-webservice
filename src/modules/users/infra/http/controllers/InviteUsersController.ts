import CreateInviteUserService from '@modules/users/services/CreateInviteUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CompaniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, type } = request.body;

    const createInviteUser = container.resolve(CreateInviteUserService);

    const inviteUser = await createInviteUser.execute({
      name,
      email,
      type,
    });

    return response.json(inviteUser);
  }
}
