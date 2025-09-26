import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Status, Tasks } from '@prisma/client';
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

  async getTasks(status?: string) {
    if (status) {
      // Normaliza o valor (evita erro com maiúsculo/minúsculo)
      const normalizedStatus = status.toUpperCase() as keyof typeof Status;

      // Validação: só aceita valores existentes no enum
      if (!(Object.keys(Status) as string[]).includes(normalizedStatus)) {
        throw new BadRequestException(
          `Status inválido: ${status}. Valores permitidos: ${Object.keys(Status).join(', ')}`,
        );
      }

      // Chama o repository com o status já validado
      return this.taskRepository.getTasks(Status[normalizedStatus]);
    }

    // Sem status → retorna tudo
    return this.taskRepository.getTasks();
  }

  async updateTask(id: string, params: Partial<Tasks>): Promise<Tasks> {
    const taskExists = await this.taskRepository.existeTask({ id });
    if (!taskExists) {
      throw new BadRequestException('Task not found');
    }

    if (params.status) {
      // Normaliza o valor (evita erro com maiúsculo/minúsculo)
      const normalizedStatus = params.status.toUpperCase() as keyof typeof Status;

      // Validação: só aceita valores existentes no enum
      if (!(Object.keys(Status) as string[]).includes(normalizedStatus)) {
        throw new BadRequestException(
          `Status inválido: ${params.status}. Valores permitidos: ${Object.keys(Status).join(', ')}`,
        );
      }
      params.status = Status[normalizedStatus];
    }
    // Chama o repository com o status já validado ou sem alteração de status
    return await this.taskRepository.updateTask(id, params);
  }

  async deleteTask(id: string) {
    const taskExists = await this.taskRepository.existeTask({ id });
    if (!taskExists) {
      throw new BadRequestException('Task not found');
    }
    const del = await this.taskRepository.deleteTask(id);
    return { message: 'Task deleted'};
  }
}