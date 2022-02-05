import { Injectable } from '@nestjs/common';
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
}
