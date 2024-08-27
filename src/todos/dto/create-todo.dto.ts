import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    type: String,
    description: 'title of the todo',
    example: 'this is the title of a todo',
  })
  @IsOptional()
  @IsString()
  // @MinLength(1)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Description of the todo',
    example: 'this is a description, you can enter it in this field',
  })
  @IsString()
  @MinLength(1)
  text: string;

  @ApiProperty({
    type: String,
    description: 'Status of the todo',
    required: false,
    default: 'pending',
  })
  @IsString()
  @MinLength(1)
  @IsOptional() // Optional, defaults to 'pending'
  status?: string;

  @ApiProperty({
    type: String,
    description: 'UserID of the todo creator',
    required: true,
    example: 'random_user_id_98765543211',
  })
  @IsString()
  @MinLength(1)
  userId: string;
}
