import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { CatsController } from './cats.controller';
import { CatsNew } from './cats.entity';
import { CatsService } from './cats.service';

@Module({
  // creation of repository
  // import userModule to use userService
  imports: [TypeOrmModule.forFeature([CatsNew]), UsersModule],
  providers: [CatsService, CurrentUserInterceptor],
  controllers: [CatsController],
})
export class CatsModule {}
