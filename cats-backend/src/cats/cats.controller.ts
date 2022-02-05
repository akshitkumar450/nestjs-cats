import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './DTO/create-cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get('/')
  getAllCats() {
    return this.catsService.findAll();
  }

  @Post('/')
  createCat(@Body() body: CreateCatsDto) {
    // console.log(body);
    return this.catsService.createCat(body);
  }
}
