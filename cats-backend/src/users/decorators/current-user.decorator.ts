import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// our CurrentUser decorator can't access the User service instance
// to use User service instance ,,make a interceptor to get current user and then use value produced by it in this decorator
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log('decorator', request.currentUser);
    return request.currentUser;
  },
);
