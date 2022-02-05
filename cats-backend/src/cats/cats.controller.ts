import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './DTO/create-cats.dto';
import { UpdateCatDto } from './DTO/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/search?')
  getByMinMax(
    @Query('age_gte') age_gte: string,
    @Query('age_lte') age_lte: string,
  ) {
    // console.log(age_gte, age_lte);
    return this.catsService.findByMinMax(parseInt(age_gte), parseInt(age_lte));
  }
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
    // console.log(parseInt(id));
    return this.catsService.deleteCat(parseInt(id));
  }

  @Patch(':id')
  updateCat(@Param('id') id: string, @Body() body: UpdateCatDto) {
    return this.catsService.updateCat(parseInt(id), body);
  }
}
