import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersSerive.findById(parseInt(id));
  }

  @Get('/')
  findAll() {
    return this.usersSerive.findAll();
  }
}
