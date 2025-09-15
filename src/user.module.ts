import { Module } from '@nestjs/common';

import { UsersService } from './services/users/users.service';

import { UsersRepository } from './modules/repositorys/users.repository';
import { PrismaService } from './libs/prisma.service';

@Module({
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService, UsersRepository], // exporta para outros módulos poderem usar
})
export class UsersModule {}
