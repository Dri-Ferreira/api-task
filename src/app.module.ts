import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './user.module';
import { PrismaService } from './modules/libs/prisma.service';
import { TaskModule } from './task.module';


@Module({
  imports: [UsersModule, TaskModule],
  controllers: [AppController],
  providers: [ PrismaService],
})
export class AppModule {}
