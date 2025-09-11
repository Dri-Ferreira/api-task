import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CreateUserDto } from './services/users/dto/create-user-dto';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/register')
  createUsers(@Body() creatUserDto: CreateUserDto) {
    return this.usersService.createUser(creatUserDto);
  }

}
