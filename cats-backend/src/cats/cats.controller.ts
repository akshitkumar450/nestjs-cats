import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:name')
  getCatByName(@Param('name') name: string) {
    // console.log(name);
    return this.catsService.findByName(name);
  }

  @Delete(':id')
  deleteCat(@Param('id') id: string) {
    console.log(parseInt(id));
    return this.catsService.deleteCat(parseInt(id));
  }
}
