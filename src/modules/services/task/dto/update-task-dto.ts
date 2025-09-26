import { IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  task_title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: Status | undefined;
}
