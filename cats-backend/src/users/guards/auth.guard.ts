import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers.token);
    if (!request.headers.token) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
