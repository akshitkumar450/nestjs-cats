import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsNew } from './cats/cats.entity';
import { CatsModule } from './cats/cats.module';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          username: config.get<string>('DB_USERNAME'),
          database: config.get<string>('DB_NAME'),
          // synchronize: true,
          password: config.get<string>('DB_PASSWORD'),
          entities: [CatsNew, Users],
        };
      },
    }),
    CatsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // global pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // to automatically delete fields which are not mentioned in DTO from the incoming request
      }),
    },
  ],
})
export class AppModule {}
