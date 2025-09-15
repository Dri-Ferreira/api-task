import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma.service';
import { createUsersParams } from 'src/services/users/params.users';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  existeUser(where: Partial<User>): Promise<User | null> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  register(params: createUsersParams): Promise<any> {
    return this.prisma.user.create({
      data: {
        id: uuidv4(),
        name: params.name,
        email: params.email,
        password: params.password,
      },
    });
  }

  createTask(data: {
    task_title: string;
    description: string;
    status?: string;
    userId: string;
  }) {
    return this.prisma.tasks.create({
      data: {
        id: uuidv4(),
        task_title: data.task_title,
        description: data.description,
        status: 'PENDING',
        userId: data.userId,
      },
    });
  }
}
