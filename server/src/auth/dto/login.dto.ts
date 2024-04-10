import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  password: string;
}
