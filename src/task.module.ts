import { TaskService } from './modules/services/task/task.service';
import { Module } from '@nestjs/common';


import { TodoRepository } from './modules/repository/todo.repository';
import { PrismaService } from './modules/libs/prisma.service';

@Module({
  providers: [TaskService, TodoRepository, PrismaService],
  exports: [TaskService, TodoRepository], // exporta para outros módulos poderem usar
})
export class TaskModule {}