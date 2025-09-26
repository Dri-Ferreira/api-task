import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma.service';
import { createUsersParams } from 'src/services/users/params.users';
import { Status } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  //Metodos para Users
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


  findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        tasks: {
          select: { task_title: true, description: true, status: true },
        },
      },
    });
  }

  getUserById(id: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { id },
      include: {
        tasks: {
          select: { task_title: true, description: true, status: true },
        },
      },
    });
    return user;
  }

  updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id},
      data,
    });
  }

  deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }


  //Metodos para Tasks
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

  getTasks(status?: Status) {
    if (status) {
      return this.prisma.tasks.findMany({
        where: { status },
      });
    }
    return this.prisma.tasks.findMany();
  }
  existeTask(where: Partial<{ id: string }>): Promise<any | null> {
    return this.prisma.tasks.findFirst({
      where,
    });
  }

  updateTask(id: string, data: Partial<{ task_title: string; description: string; status: Status; userId: string; }>): Promise<any> {
    return this.prisma.tasks.update({
      where: { id },
      data,
    });
  }

  deleteTask(id: string) {
    return this.prisma.tasks.delete({
      where: { id },
    });
  }
}
