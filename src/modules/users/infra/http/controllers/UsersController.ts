import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.params.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ userId });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userData = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(userData);

    return response.json(classToClass(user));
  }
}
