import { IsString, IsEmail } from 'class-validator';

export class SignInUserDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
