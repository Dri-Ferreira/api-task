import { Inject, Injectable } from '@nestjs/common';
import { createUsersParams } from './params.users';
import { UsersRepository } from 'src/modules/repositorys/users.repository';

@Injectable()
export class UsersService {

  constructor(@Inject(UsersRepository) private readonly usersRepository: UsersRepository) { }

  async createUser(params: createUsersParams): Promise<void> {

    const user = await this.usersRepository.register(params)
    return user;

  }
}
