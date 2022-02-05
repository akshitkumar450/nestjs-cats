import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsNew } from './cats.entity';
import { CatsService } from './cats.service';

@Module({
  // creation of repository
  imports: [TypeOrmModule.forFeature([CatsNew])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
