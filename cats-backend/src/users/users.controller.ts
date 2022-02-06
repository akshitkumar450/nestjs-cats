import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { SignInUserDto } from './DTO/signin-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersSerive: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { name, email, password } = body;
    return this.usersSerive.signUp(name, email, password);
  }

  @Post('/signin')
  loginUser(@Body() body: SignInUserDto) {
    const { email, password } = body;
    return this.usersSerive.signIn(email, password);
  }
}
