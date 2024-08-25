import { IsOptional, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  // @MinLength(1)
  title: string;

  @IsOptional()
  @MinLength(1)
  text: string;

  @IsOptional()
  @MinLength(1)
  status: string;
}
