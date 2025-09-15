import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CreateUserDto } from './services/users/dto/create-user-dto';
import { TaskService } from './services/task/task.service';
import { CreateTaskDto } from './services/task/dto/create-task-dto';

@Controller()
export class AppController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(TaskService) private readonly taskService: TaskService,
  ) {}
  @Post('/register')
  createUsers(@Body() creatUserDto: CreateUserDto) {
    return this.usersService.createUser(creatUserDto);
  }

  @Post('/task')
  createTask(@Body() creatTaskDto: CreateTaskDto) {
    return this.taskService.createTask(creatTaskDto);
  }
}
