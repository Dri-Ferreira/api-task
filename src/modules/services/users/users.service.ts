import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { createUsersParams } from './params.users';
import { TodoRepository, } from 'src/modules/repository/todo.repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';

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

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.todoRepository.findAllUsers();
    return users.map(({ password, ...user }) => user );
  }

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.todoRepository.existeUser({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const userWithTasks = await this.todoRepository.getUserById(id);
    if (!userWithTasks) {
      throw new BadRequestException('User not found');
    }
    const { password, ...userWithoutPassword } = userWithTasks;
    return userWithoutPassword;
  }

  async updateUser(id: string, data: Partial<UpdateUserDto>): Promise<Omit<User, 'password'>> {
    const user = await this.todoRepository.existeUser({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const updatedUser = await this.todoRepository.updateUser(id, data);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.todoRepository.existeUser({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.todoRepository.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}