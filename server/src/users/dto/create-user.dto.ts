import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'user@email.com' })
  @MinLength(6)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
