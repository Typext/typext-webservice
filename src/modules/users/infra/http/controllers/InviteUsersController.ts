import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateInviteUserService from '@modules/users/services/CreateInviteUserService';
import UpdateInviteUserTokenService from '@modules/users/services/UpdateInviteUserTokenService';

export default class InviteUserController {
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
    const { email } = request.body;

    const updateUserToken = container.resolve(UpdateInviteUserTokenService);

    await updateUserToken.execute(email);

    return response.json({ message: 'New invitation email has been sent.' });
  }
}
