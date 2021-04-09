import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import UpdateUserTypeService from '@modules/users/services/UpdateUserTypeService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ userId });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUsersService);
    const userType = request.user.type;
    const usersList = await listUserService.execute(userType);
    return response.json(classToClass(usersList));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userData = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(userData);

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const {
      name,
      old_password,
      password,
      office,
      area,
      company,
      phone,
    } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      userId,
      name,
      old_password,
      password,
      office,
      area,
      company,
      phone,
    });

    return response.json(classToClass(user));
  }

  public async patch(request: Request, response: Response): Promise<Response> {
    const userId = request.params.id;

    const userType = request.user.type;

    const { type } = request.body;

    const updateUser = container.resolve(UpdateUserTypeService);

    const user = await updateUser.execute({
      userId,
      userType,
      type,
    });

    return response.json(classToClass(user));
  }
}
