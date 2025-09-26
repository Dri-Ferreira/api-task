import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './modules/services/users/users.service';
import { CreateUserDto } from './modules/services/users/dto/create-user-dto';
import { TaskService } from './modules/services/task/task.service';
import { CreateTaskDto } from './modules/services/task/dto/create-task-dto';
import { UpdateUserDto } from './modules/services/users/dto/update-user-dto';
import { UpdateTaskDto } from './modules/services/task/dto/update-task-dto';

@Controller()
export class AppController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(TaskService) private readonly taskService: TaskService,
  ) {}

  // controller para users
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

  @Put('/update')
  updateUser(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/user/delete')
  deleteUser(@Query('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  // controller para tasks
  @Post('/task')
  createTask(@Body() creatTaskDto: CreateTaskDto) {
    return this.taskService.createTask(creatTaskDto);
  }

  // filtrar tasks por status
  @Get('/tasks')
  getTasks(@Query('status') status: string) {
    return this.taskService.getTasks(status);
  }

  @Put('/task/update')
  updateTask(@Query('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }
  
  @Delete('/task/delete')
  deleteTask(@Query('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
