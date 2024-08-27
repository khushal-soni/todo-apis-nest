import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({
    type: String,
    description: 'Title of the task',
  })
  @IsOptional()
  // @MinLength(1)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Description of the task',
  })
  @IsOptional()
  @MinLength(1)
  text: string;

  @ApiProperty({
    type: String,
    description: 'Status of the task',
  })
  @IsOptional()
  @MinLength(1)
  status: string;
}
