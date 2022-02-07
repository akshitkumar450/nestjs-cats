import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './DTO/create-user.dto';
import { SignInUserDto } from './DTO/signin-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { Users } from './users.entity';
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

  // to see the current logged in user
  @Get('/whoami')
  @UseGuards(AuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  getUser(@CurrentUser() user: Users) {
    // user is the current logged in user
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersSerive.findById(parseInt(id));
  }

  @Get('/')
  findAll() {
    return this.usersSerive.findAll();
  }
}
