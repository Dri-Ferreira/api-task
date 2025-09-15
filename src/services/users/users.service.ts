import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { createUsersParams } from './params.users';
import { TodoRepository, } from 'src/modules/repositorys/todo.repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  async createUser(params: createUsersParams): Promise<User> {
    const userExists = await this.todoRepository.existeUser({
      email: params.email,
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const passwordhash = await bcrypt.hash(params.password, 10);

    const user = await this.todoRepository.register({
      name: params.name,
      email: params.email,
      password: passwordhash,
    });
    return { ...user, password: undefined };
  }
}
