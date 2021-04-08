import CreateInviteUserService from '@modules/users/services/CreateInviteUserService';
import UpdateInviteUserTokenService from '@modules/users/services/UpdateInviteUserTokenService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CompaniesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, type } = request.body;

    const createInviteUser = container.resolve(CreateInviteUserService);

    await createInviteUser.execute({
      name,
      email,
      type,
    });

    return response.json({ message: 'Your invitation has been sent!' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const updateUserToken = container.resolve(UpdateInviteUserTokenService);

    await updateUserToken.execute({ token });

    return response.json({ message: 'New invitation email has been sent.' });
  }
}
