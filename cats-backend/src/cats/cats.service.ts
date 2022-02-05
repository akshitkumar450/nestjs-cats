import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatsNew } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsNew) private catsRepo: Repository<CatsNew>,
  ) {}

  findAll() {
    return this.catsRepo.find();
  }
  createCat(body) {
    const cat = this.catsRepo.create(body);
    return this.catsRepo.save(cat);
  }

  async findByName(name: string) {
    const cat = await this.catsRepo.find({ name });
    // console.log(cat);
    if (cat.length === 0)
      throw new NotFoundException(`cat with given ${name} not found`);

    return cat;
  }

  async deleteCat(id: number) {
    const catToBeDeleted = await this.catsRepo.findOne(id);
    console.log(catToBeDeleted);
    if (!catToBeDeleted)
      throw new NotFoundException(`cat to be deleted with id${id} not found`);
    return this.catsRepo.remove(catToBeDeleted);
  }

  async findByMinMax(query) {
    const { age_lte, age_gte } = query;
    // console.log(+age_lte, +age_gte);
    const cat = await this.catsRepo
      .createQueryBuilder()
      .select('*')
      .where(`age BETWEEN ${+age_lte} AND ${+age_gte}`)
      .getRawMany();
    // console.log(cat);
    if (cat.length === 0)
      throw new NotFoundException(`no cat in range ${age_lte} and ${age_gte}`);
    return cat;
  }
}
