import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Walk the dog' })
  @IsString()
  @IsNotEmpty()
  todo: string;
}
