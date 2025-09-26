import { Module } from '@nestjs/common';

import { UsersService } from './modules/services/users/users.service';

import { TodoRepository } from './modules/repository/todo.repository';
import { PrismaService } from './modules/libs/prisma.service';

@Module({
  providers: [UsersService, TodoRepository, PrismaService],
  exports: [UsersService, TodoRepository], // exporta para outros módulos poderem usar
})
export class UsersModule {}
