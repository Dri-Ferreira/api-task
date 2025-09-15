import { Inject, Injectable } from '@nestjs/common';
import { Tasks } from '@prisma/client';
import { TodoRepository } from 'src/modules/repositorys/todo.repository';
import { createTaskParams } from './params.task';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TodoRepository) private readonly taskRepository: TodoRepository,
  ) {}

  async createTask(params: createTaskParams): Promise<Tasks> {
    const task = await this.taskRepository.createTask({
      task_title: params.task_title,
      description: params.description,
      userId: params.userId,
    });
    return task;
  }
}
