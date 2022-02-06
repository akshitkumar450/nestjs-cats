import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}

  async signUp(name: string, email: string, password: string) {
    const checkUser = await this.usersRepo.findOne({ email });
    if (checkUser) throw new BadRequestException('email already in use');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepo.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return this.usersRepo.save(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepo.findOne({ email });
    if (!user) throw new NotFoundException(`no user found with ${email} email`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('email or password do not match');
    }
    return user;
  }
}
