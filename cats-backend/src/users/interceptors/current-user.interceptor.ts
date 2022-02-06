import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  //  DI to use Userservice
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    //    context is wrapper around incoming request
    // getting logged in user from session
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers);
    const token = request.headers.token;
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    // @ts-ignore
    if (!decoded.userId) throw new BadRequestException('please login');
    // @ts-ignore
    const userId: any = decoded.userId;
    // console.log(userId);
    if (userId) {
      const user = await this.userService.findById(userId);

      // set the current logged in user to request so that it can be used in CurrentUser Decorator
      request.currentUser = user;
    }
    // to run actual route handler
    return next.handle();
  }
}
