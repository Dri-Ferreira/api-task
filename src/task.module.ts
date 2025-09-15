import { TaskService } from './services/task/task.service';
import { Module } from '@nestjs/common';


import { TodoRepository } from './modules/repositorys/todo.repository';
import { PrismaService } from './libs/prisma.service';

@Module({
  providers: [TaskService, TodoRepository, PrismaService],
  exports: [TaskService, TodoRepository], // exporta para outros módulos poderem usar
})
export class TaskModule {}