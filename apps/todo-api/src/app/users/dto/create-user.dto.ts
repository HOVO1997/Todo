import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsEmail()
  email: string;
}
