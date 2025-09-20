import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
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

  @Get('/users')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/users/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post('/register')
  createUsers(@Body() creatUserDto: CreateUserDto) {
    return this.usersService.createUser(creatUserDto);
  }

  @Post('/task')
  createTask(@Body() creatTaskDto: CreateTaskDto) {
    return this.taskService.createTask(creatTaskDto);
  }

  // filtrar tasks por status
  @Get('/tasks')
  getTasks(@Query('status') status: string) {
    return this.taskService.getTasks(status);
  }
}
