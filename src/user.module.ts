import { Module } from '@nestjs/common';

import { UsersService } from './services/users/users.service';

import { TodoRepository } from './modules/repositorys/todo.repository';
import { PrismaService } from './libs/prisma.service';

@Module({
  providers: [UsersService, TodoRepository, PrismaService],
  exports: [UsersService, TodoRepository], // exporta para outros módulos poderem usar
})
export class UsersModule {}
