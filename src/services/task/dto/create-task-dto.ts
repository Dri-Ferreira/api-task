import {  IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task_title: string;

  @IsString()
  description: string;

  @IsString()
  userId: string;
}
