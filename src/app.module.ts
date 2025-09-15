import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './user.module';
import { PrismaService } from './libs/prisma.service';


@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [ PrismaService],
})
export class AppModule {}
