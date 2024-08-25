import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsOptional()
  @IsString()
  // @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  text: string;

  @IsString()
  @MinLength(1)
  @IsOptional() // Optional, defaults to 'pending'
  status?: string;

  @IsString()
  @MinLength(1)
  userId: string;
}
